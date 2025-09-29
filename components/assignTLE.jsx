// components/assignTLE.jsx
let loaded = false;
let loadingPromise = null;
let tleMap = new Map();

function normalizeId(s) {
  // "01520" -> "1520"
  return String(parseInt(String(s).trim(), 10));
}

/**
 * Robust TLE parser:
 * - Works with 3-line (name + L1 + L2) and 2-line (L1 + L2) formats.
 * - Ignores blank/comment lines.
 * - Normalizes NORAD id to strip leading zeros.
 */
function parseTLEs(text) {
  const out = new Map();
  if (!text) return out;

  // Normalize newlines and trim
  const t = text.replace(/\r/g, "\n").replace(/\n+/g, "\n").trim();

  const lines = t.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const a = lines[i] ?? "";
    const b = lines[i + 1] ?? "";
    const c = lines[i + 2] ?? "";

    const isL1 = /^1\s+(\d{1,6})\D/.exec(a);
    const isL2 = /^2\s+/.test(b);

    // Case A: 2-line TLE starts at i (no name line)
    if (isL1 && isL2) {
      const id = normalizeId(isL1[1]);
      const name = ""; // unknown
      out.set(id, `${name}\n${a}\n${b}`);
      i += 1;
      continue;
    }

    // Case B: 3-line TLE (name at i, then L1, L2)
    const isL1b = /^1\s+(\d{1,6})\D/.exec(b);
    const isL2b = /^2\s+/.test(c);
    if (isL1b && isL2b) {
      const id = normalizeId(isL1b[1]);
      const name = a.trim();
      out.set(id, `${name}\n${b}\n${c}`);
      i += 2;
      continue;
    }

    // Otherwise: move on
  }

  // Debug (shows in browser console)
  console.log("[assignTLE] loaded", out.size, "entries");
  console.log("[assignTLE] sample IDs:", Array.from(out.keys()).slice(0, 20));
  return out;
}

async function loadOnce() {
  if (loaded) return;
  if (!loadingPromise) {
    loadingPromise = (async () => {
      let txt = null;
      try {
        console.log("[assignTLE] loading TLEs…");

        // 1) Try API (Blob or local fallback served by /api/tle)
        try {
          const r = await fetch("/api/tle", { cache: "no-store" });
          console.log("[assignTLE] /api/tle status", r.status);
          if (r.ok) {
            const t = await r.text();
            console.log("[assignTLE] /api/tle length", t.length, "head:", t.slice(0, 120).replace(/\n/g, "\\n"));
            txt = t;
          }
        } catch (e) {
          console.warn("[assignTLE] /api/tle fetch failed:", e?.message || e);
        }

        // 2) Fallback: direct static file from /public if API failed or empty
        if (!txt) {
          try {
            const r2 = await fetch("/tle-cache/default.tle", { cache: "no-store" });
            console.log("[assignTLE] /tle-cache/default.tle status", r2.status);
            if (r2.ok) {
              const t2 = await r2.text();
              console.log("[assignTLE] /tle-cache length", t2.length, "head:", t2.slice(0, 120).replace(/\n/g, "\\n"));
              txt = t2;
            }
          } catch (e) {
            console.warn("[assignTLE] static fallback fetch failed:", e?.message || e);
          }
        }

        if (txt) {
          tleMap = parseTLEs(txt);
          loaded = true;

          if (typeof window !== "undefined") {
            // handy dev helpers
            window.__tleHas = (id) => tleMap.has(normalizeId(id));
            window.__tleGet = (id) => tleMap.get(normalizeId(id)) || "";
            window.dispatchEvent(new Event("tle-ready"));
          }
        } else {
          console.warn("[assignTLE] could not load TLEs from API nor static fallback");
        }
      } finally {
        loadingPromise = null;
      }
    })();
  }
  return loadingPromise;
}

// Public API unchanged
export default function assignTLE(id) {
  if (!loaded && typeof window !== "undefined") loadOnce();
  const key = id == null ? "" : normalizeId(id);
  const val = key ? (tleMap.get(key) || "") : "";
  if (loaded && key && !val && typeof window !== "undefined") {
    window.__TLE_MISS = window.__TLE_MISS || new Set();
    if (!window.__TLE_MISS.has(key)) {
      console.warn("[assignTLE] No TLE for NORAD", key);
      window.__TLE_MISS.add(key);
    }
  }
  return val;
}
