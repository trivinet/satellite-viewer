// pages/api/tle.js
import fs from "fs";
import path from "path";
import { list } from "@vercel/blob";

const FALLBACK_PATH = path.join(process.cwd(), "public", "tle-cache", "default.tle");

export default async function handler(req, res) {
  try {
    let text = null;

    // 1) Try the latest file in Vercel Blob: "tle/active.tle"
    try {
      const { blobs } = await list({ prefix: "tle/active.tle" });
      const match = blobs?.find(b => b.pathname === "tle/active.tle") || blobs?.[0];
      if (match?.url) {
        const r = await fetch(match.url);
        if (r.ok) text = await r.text();
      }
    } catch (e) {
      console.warn("[/api/tle] blob list failed:", e?.message);
    }

    // 2) Fallback to local default file (bundled in repo)
    if (!text) {
      if (fs.existsSync(FALLBACK_PATH)) {
        text = fs.readFileSync(FALLBACK_PATH, "utf8");
      } else {
        console.warn("[/api/tle] fallback missing at:", FALLBACK_PATH);
      }
    }

    if (text) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.status(200).send(text);
    }

    return res.status(404).json({ error: "No TLE available yet.", triedFallback: FALLBACK_PATH });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
