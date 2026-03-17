const glow = document.querySelector(".page-glow");
const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (glow && supportsFinePointer && !prefersReducedMotion) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let targetScale = 1;
  let currentScale = 1;
  let isVisible = false;

  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (!isVisible) {
      glow.style.opacity = "0.34";
      isVisible = true;
    }
  });

  document.querySelectorAll("a, .card, .photo-frame").forEach((element) => {
    element.addEventListener("pointerenter", () => {
      targetScale = 1.12;
      glow.style.opacity = "0.42";
    });

    element.addEventListener("pointerleave", () => {
      targetScale = 1;
      glow.style.opacity = "0.34";
    });
  });

  window.addEventListener("pointerdown", () => {
    targetScale = 0.94;
  });

  window.addEventListener("pointerup", () => {
    targetScale = 1;
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
    isVisible = false;
  });

  const animateGlow = () => {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    currentScale += (targetScale - currentScale) * 0.14;
    glow.style.setProperty("--glow-scale", currentScale.toFixed(3));
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
    window.requestAnimationFrame(animateGlow);
  };

  window.requestAnimationFrame(animateGlow);
} else if (glow) {
  glow.style.display = "none";
}
