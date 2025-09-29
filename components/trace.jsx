// components/trace.jsx
import { getLatLngObj } from "tle.js";

export default function Pos(tle, totalPoints = 1, interval = 0) {
  try {
    const out = [];
    const half = Math.ceil(totalPoints / 2);
    const baseTs = Date.now();

    for (let i = -half; i < half; i++) {
      const ts = baseTs + i * interval;

      let ll;
      try {
        ll = getLatLngObj(tle, ts); // can throw or return undefined for bad TLE
      } catch {
        return ''; // your existing “fail” sentinel
      }

      if (
        !ll ||
        !Object.prototype.hasOwnProperty.call(ll, 'lat') ||
        !Object.prototype.hasOwnProperty.call(ll, 'lng') ||
        !Number.isFinite(ll.lat) ||
        !Number.isFinite(ll.lng)
      ) {
        return ''; // invalid point -> bail out consistently
      }

      out.push({ lat: ll.lat, lng: ll.lng });
    }

    return out; // all points OK
  } catch {
    return ''; // any unexpected error -> sentinel
  }
}
