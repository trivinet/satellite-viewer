// pages/api/tle-update.js
import { put } from "@vercel/blob";

const TLE_URL = "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle";

export default async function handler(req, res) {
  try {
    const r = await fetch(TLE_URL, { cache: "no-store" });
    if (!r.ok) throw new Error(`Bad status ${r.status}`);
    const text = await r.text();

    // Save/overwrite the permanent file in Blob
    // Key can be anything; we'll standardize on "tle/active.tle"
    const { url } = await put("tle/active.tle", new Blob([text]), {
      access: "public" // or "private" if you'd rather only read via server-side
    });

    return res.status(200).json({ ok: true, saved: url, size: text.length });
  } catch (e) {
    console.error("TLE update failed:", e);
    return res.status(500).json({ ok: false, error: e.message });
  }
}
