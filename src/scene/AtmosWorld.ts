import * as THREE from 'three';

/**
 * AtmosWorld — the immersive descent.
 *
 * An original Three.js scene in the "scroll-as-altitude" grammar: the page
 * scrollbar drives a camera down through five atmospheric strata — drifting
 * dust, cloud decks, wireframe monoliths, a gateway ring, and finally the
 * surface grid of the archive. Monochrome steel on near-black with the
 * single acid accent. Everything is generated; no external assets.
 */

export interface AtmosWorldOptions {
  canvas: HTMLCanvasElement;
  reducedMotion: boolean;
  lowPower: boolean;
  /** Called (throttled) whenever the smoothed descent progress changes. */
  onProgress?: (progress: number) => void;
}

const BG = 0x060809;
const STEEL = 0x8fa0a6;
const BONE = 0xd7e0da;
const ACCENT = 0xc7ff35;

/** World-units of descent between the top of the sky and the surface. */
const TOP = 96;
const SPAN = 232;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uRise;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aOffset;
  varying float vFade;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * aSpeed + aOffset) * 1.4;
    p.y += mod(p.y + uTime * aSpeed * uRise + 160.0, 300.0) - 150.0;
    p.z += cos(uTime * aSpeed * 0.7 + aOffset * 1.3) * 1.4;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * aScale * uPixelRatio * (150.0 / max(1.0, -mv.z));
    vFade = smoothstep(190.0, 24.0, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uAlpha;
  varying float vFade;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float a = smoothstep(0.5, 0.06, d) * uAlpha * vFade;
    if (a < 0.003) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

interface PointLayer {
  points: THREE.Points;
  material: THREE.ShaderMaterial;
}

export class AtmosWorld {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  private layers: PointLayer[] = [];
  private monoliths: THREE.LineSegments[] = [];
  private monolithMaterial: THREE.LineBasicMaterial;
  private accentMaterial: THREE.LineBasicMaterial;
  private disposables: Array<{ dispose(): void }> = [];

  private raf = 0;
  private running = false;
  private clock = new THREE.Clock();
  private time = 0;

  private progressTarget = 0;
  private progressCurrent = 0;
  private lastReported = -1;
  private pointerTarget = new THREE.Vector2(0, 0);
  private pointerCurrent = new THREE.Vector2(0, 0);

  private onProgress?: (p: number) => void;
  private readonly reduced: boolean;
  private dpr = 1.5;

  constructor(opts: AtmosWorldOptions) {
    this.onProgress = opts.onProgress;
    this.reduced = opts.reducedMotion;
    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      antialias: !opts.lowPower,
      powerPreference: 'high-performance',
    });
    this.dpr = Math.min(window.devicePixelRatio || 1, opts.lowPower ? 1.35 : 1.75);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setClearColor(BG, 1);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(BG);
    this.scene.fog = new THREE.FogExp2(BG, 0.0145);

    this.camera = new THREE.PerspectiveCamera(62, 1, 0.1, 420);
    this.camera.position.set(0, TOP, 0);

    // ── fine dust, everywhere ──────────────────────────────────────────
    this.layers.push(
      this.makePointLayer({
        count: opts.lowPower ? 1500 : 4200,
        color: BONE,
        size: 2.1,
        alpha: 0.55,
        rise: 0.6,
        spread: 120,
        band: [-160, 160],
      }),
    );

    // ── three cloud decks, one per middle stratum ──────────────────────
    const decks = opts.lowPower ? [26] : [38, -4, -58];
    for (const y of decks) {
      this.layers.push(
        this.makePointLayer({
          count: opts.lowPower ? 420 : 1100,
          color: STEEL,
          size: 4.4,
          alpha: 0.16,
          rise: 0.18,
          spread: 130,
          band: [y - 9, y + 9],
        }),
      );
    }

    // ── rare rising embers in the accent color ─────────────────────────
    this.layers.push(
      this.makePointLayer({
        count: opts.lowPower ? 26 : 64,
        color: ACCENT,
        size: 2.6,
        alpha: 0.85,
        rise: 2.4,
        spread: 46,
        band: [-140, 120],
      }),
    );

    // ── wireframe monoliths along the descent ──────────────────────────
    this.monolithMaterial = new THREE.LineBasicMaterial({
      color: STEEL,
      transparent: true,
      opacity: 0.4,
    });
    this.accentMaterial = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.9,
    });
    this.disposables.push(this.monolithMaterial, this.accentMaterial);

    const towerGeo = new THREE.BoxGeometry(2.2, 13, 0.7);
    this.disposables.push(towerGeo);
    const towers: Array<[number, number, number, number]> = [
      // x, y, z, rotationSeed
      [-14, 42, -34, 0.4],
      [17, 16, -52, 1.1],
      [-22, -6, -70, 2.2],
      [10, -30, -88, 0.9],
      [-9, -58, -104, 1.7],
      [24, -84, -118, 0.2],
      [0, -100, -92, 2.9], // the archive marker — the accent one
    ];
    towers.forEach(([x, y, z, seed], i) => {
      const edges = new THREE.EdgesGeometry(towerGeo);
      this.disposables.push(edges);
      const mesh = new THREE.LineSegments(edges, i === towers.length - 1 ? this.accentMaterial : this.monolithMaterial);
      mesh.position.set(x, y, z);
      mesh.rotation.set(seed * 0.3, seed * 1.4, 0);
      mesh.userData.spin = (i % 2 === 0 ? 1 : -1) * (0.05 + seed * 0.02);
      this.scene.add(mesh);
      this.monoliths.push(mesh);
    });

    // ── the gateway ring near the top ──────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(15, 0.06, 3, 96);
    this.disposables.push(ringGeo);
    const ring = new THREE.LineSegments(
      new THREE.EdgesGeometry(ringGeo, 1),
      this.monolithMaterial,
    );
    this.disposables.push(ring.geometry);
    ring.position.set(0, TOP - 26, -44);
    ring.rotation.x = Math.PI / 2.4;
    ring.userData.spin = 0.04;
    this.scene.add(ring);
    this.monoliths.push(ring);

    // ── the surface grid of the archive ────────────────────────────────
    const grid = this.makeGrid(300, 300, 24);
    grid.position.set(0, -134, -40);
    this.scene.add(grid);
    this.monoliths.push(grid);

    this.resize();
    this.renderFrame(); // paint one frame immediately (also used by reduced motion)
  }

  /* ------------------------------------------------------------------ */

  private makePointLayer(o: {
    count: number;
    color: number;
    size: number;
    alpha: number;
    rise: number;
    spread: number;
    band: [number, number];
  }): PointLayer {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(o.count * 3);
    const scales = new Float32Array(o.count);
    const speeds = new Float32Array(o.count);
    const offsets = new Float32Array(o.count);

    for (let i = 0; i < o.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * o.spread * 2;
      positions[i * 3 + 1] = o.band[0] + Math.random() * (o.band[1] - o.band[0]);
      positions[i * 3 + 2] = (Math.random() - 0.5) * o.spread - 10;
      scales[i] = 0.4 + Math.random() * 1.1;
      speeds[i] = 0.12 + Math.random() * 0.5;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: this.dpr },
        uSize: { value: o.size },
        uRise: { value: o.rise },
        uColor: { value: new THREE.Color(o.color) },
        uAlpha: { value: o.alpha },
      },
    });
    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
    this.disposables.push(geometry, material);
    return { points, material };
  }

  private makeGrid(w: number, h: number, step: number): THREE.LineSegments {
    const verts: number[] = [];
    for (let x = -w / 2; x <= w / 2; x += step) verts.push(x, 0, 0, x, 0, -h);
    for (let z = 0; z >= -h; z -= step) verts.push(-w / 2, 0, z, w / 2, 0, z);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
    this.disposables.push(geometry);
    const material = new THREE.LineBasicMaterial({
      color: STEEL,
      transparent: true,
      opacity: 0.32,
    });
    this.disposables.push(material);
    return new THREE.LineSegments(geometry, material);
  }

  /* ------------------------------------------------------------------ */

  setProgress(p: number) {
    this.progressTarget = Math.min(1, Math.max(0, p));
  }

  setPointer(x: number, y: number) {
    this.pointerTarget.set(x, y);
  }

  resize() {
    const canvas = this.renderer.domElement;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    for (const l of this.layers) l.material.uniforms.uPixelRatio.value = this.dpr;
  }

  start() {
    if (this.running || this.reduced) return;
    this.running = true;
    this.clock.start();
    const loop = () => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      this.tick(Math.min(this.clock.getDelta(), 0.05));
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private tick(dt: number) {
    this.time += dt;
    this.progressCurrent += (this.progressTarget - this.progressCurrent) * Math.min(1, dt * 4.6);
    this.pointerCurrent.lerp(this.pointerTarget, Math.min(1, dt * 2.8));

    const p = this.progressCurrent;
    this.camera.position.y = TOP - p * SPAN;
    this.camera.position.x = this.pointerCurrent.x * 2.2;
    this.camera.position.z = this.pointerCurrent.y * 1.2;
    this.camera.lookAt(this.pointerCurrent.x * 0.8, this.camera.position.y - 10, -34);
    this.camera.rotation.z = this.pointerCurrent.x * -0.02;

    for (const l of this.layers) l.material.uniforms.uTime.value = this.time;
    for (const m of this.monoliths) {
      if (m.userData.spin) m.rotation.y += m.userData.spin * dt;
    }

    this.renderFrame();

    if (Math.abs(p - this.lastReported) > 0.0015) {
      this.lastReported = p;
      this.onProgress?.(p);
    }
  }

  private renderFrame() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.stop();
    this.disposables.forEach((d) => d.dispose());
    this.renderer.dispose();
  }
}
