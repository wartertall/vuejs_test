export function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}

export function getSize(el){
  var style = window.getComputedStyle(el, null);
  return {
    width: parseInt(style.getPropertyValue("width").replace('px',''), 10),
    height: parseInt(style.getPropertyValue("height").replace('px',''), 10)
  };
}

export function intersectRect(r1, r2) {
  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}
