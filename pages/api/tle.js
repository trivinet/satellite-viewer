// pages/api/tle.js
import fs from "fs";
import path from "path";
import { list } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    // We always upload to tle/active.tle — list finds it and gives us a URL
    const { blobs } = await list({
      prefix: "tle/active.tle",
      token: process.env.BLOB_READ_WRITE_TOKEN, // <— same token
    });
    const match = blobs?.[0];
    if (match?.url) {
      const txt = await fetch(match.url, { cache: "no-store" }).then(r => r.text());
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.status(200).send(txt);
    }
  } catch (e) {
    console.warn("[/api/tle] blob list failed:", e.message);
  }

  // Local fallback if blob isn’t ready yet
  const p = path.join(process.cwd(), "public", "tle-cache", "default.tle");
  if (fs.existsSync(p)) {
    const txt = fs.readFileSync(p, "utf8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(txt);
  }

  return res.status(404).json({ error: "No TLE available yet." });
}
