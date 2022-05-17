import { event } from './gtag';

export default function captureClick(info) {
  event('click', 'Link Out', info.name, info.link);
}
