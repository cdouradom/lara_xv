import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "assets");
const dest = path.join(root, "public", "assets");

if (!fs.existsSync(src)) {
  console.warn("[ensure-public-assets] Pasta `assets/` na raiz não encontrada — ignore se estiveres só a editar código.");
  process.exit(0);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(src, dest, { recursive: true, force: true });
console.log("[ensure-public-assets] Copiado assets/ → public/assets/");
