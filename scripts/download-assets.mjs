// One-off migration tool: download Manus-hosted assets referenced as
// /manus-storage/* and save them into client/public/manus-storage/ so the
// site is self-contained and can be hosted anywhere (Cloudflare).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FORGE_URL = "https://forge.manus.ai";
const FORGE_KEY = process.env.FORGE_KEY; // pass in via env, do not hardcode

const assets = [
  "IMG_4713_7c20d053.jpg",
  "IMG_4938_35d8e832.jpeg",
  "ai_network_32785d0d.png",
  "rfp-agent-explainer_5aad9fa4.mp4",
  "rfp-explainer_9fb0697a.mp4",
  "rj_ibm_23dcc16d.jpg",
  "rj_ibm_eea0a138.jpg",
  "rj_morehouse_teaching_2665d36f.jpeg",
  "rj_speaking_1_0561f4b4.jpeg",
  "rj_speaking_1_82784dc4.jpeg",
  "rj_speaking_2_073b0301.jpeg",
  "rj_speaking_2_f0ac4d7e.jpeg",
  "rj_speaking_3_2a87d240.jpeg",
  "rj_speaking_3_d9b01c0e.jpeg",
  "rj_speaking_4_10cefbdc.jpeg",
  "rj_speaking_4_ea49446c.jpeg",
];

const outDir = path.resolve("client/public/manus-storage");
await mkdir(outDir, { recursive: true });

let ok = 0;
for (const key of assets) {
  try {
    const presignUrl = new URL("v1/storage/presign/get", FORGE_URL + "/");
    presignUrl.searchParams.set("path", key);
    const presign = await fetch(presignUrl, {
      headers: { Authorization: `Bearer ${FORGE_KEY}` },
    });
    if (!presign.ok) {
      console.error(`PRESIGN FAIL ${key}: ${presign.status} ${await presign.text()}`);
      continue;
    }
    const { url } = await presign.json();
    if (!url) { console.error(`NO URL ${key}`); continue; }
    const file = await fetch(url);
    if (!file.ok) { console.error(`DOWNLOAD FAIL ${key}: ${file.status}`); continue; }
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(outDir, key), buf);
    console.log(`OK   ${key}  (${(buf.length / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (e) {
    console.error(`ERROR ${key}: ${e.message}`);
  }
}
console.log(`\nDownloaded ${ok}/${assets.length} assets into ${outDir}`);
