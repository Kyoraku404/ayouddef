let locks = 0;
let restore: (() => void) | undefined;

/** Freeze the page on mobile Safari too, preserving scroll and existing styles. */
export function lockBodyScroll() {
  if (locks++ === 0) {
    const { body, documentElement } = document;
    const x = window.scrollX;
    const y = window.scrollY;
    const previous = {
      position: body.style.position, top: body.style.top, left: body.style.left,
      width: body.style.width, overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const gutter = window.innerWidth - documentElement.clientWidth;
    if (gutter > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + gutter}px`;
    Object.assign(body.style, { position: "fixed", top: `-${y}px`, left: `-${x}px`, width: "100%", overflow: "hidden" });
    restore = () => {
      Object.assign(body.style, previous);
      window.scrollTo({ left: x, top: y, behavior: "instant" });
    };
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) { restore?.(); restore = undefined; }
  };
}
