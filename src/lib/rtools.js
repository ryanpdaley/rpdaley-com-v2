import { event } from "./gtag";

export function captureClick(info) {
  event("click", "Link Out", info.name, info.link);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
