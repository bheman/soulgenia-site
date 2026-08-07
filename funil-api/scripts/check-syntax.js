import { readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const roots = ["src", "test", "scripts"];
const files = roots.flatMap((root) => collectJsFiles(root));

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], {
    stdio: "inherit"
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log(`syntax ok: ${files.length} files`);

function collectJsFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectJsFiles(path);
    }

    return entry.isFile() && path.endsWith(".js") ? [path] : [];
  });
}
