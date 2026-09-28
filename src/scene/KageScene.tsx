import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

import "./kage-scene.css";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * Kage landing page — @designcodeio/threeui (MIT license).
 *
 * The component loads its authored document byte-for-byte from
 * `/landing-pages/kage.html`, which is vendored (hash-verified) under
 * `public/landing-pages/` together with its `secret-pathways-assets/`.
 */
export function Scene() {
  useDocumentTitle("Kage — ThreeUI scene");
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}

export default Scene;
