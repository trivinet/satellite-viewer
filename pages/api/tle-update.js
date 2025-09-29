// pages/api/tle-update.js
export const config = { runtime: "nodejs" }; // (ok for Next 15 too)

import { put } from "@vercel/blob";

const TLE_URL =
  "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle";

export default async function handler(req, res) {
  try {
    // 1) Fetch latest TLE text
    const r = await fetch(TLE_URL, { cache: "no-store" });
    if (!r.ok) throw new Error(`Source fetch failed: ${r.status}`);
    const tleText = await r.text();

    // 2) Upload to a STABLE key (overwrite) in Vercel Blob
    const { url } = await put("tle/active.tle", tleText, {
      access: "public",
      addRandomSuffix: false,                     // <— IMPORTANT
      contentType: "text/plain; charset=utf-8",
      token: process.env.BLOB_READ_WRITE_TOKEN,   // <— set this in Vercel & .env.local
    });

    return res.status(200).json({ ok: true, url, bytes: tleText.length });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
