import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, "..")

const srcData = path.join(projectRoot, "server/src/data")
const distData = path.join(projectRoot, "server/dist/data")

try {
  if (fs.existsSync(srcData)) {
    if (!fs.existsSync(distData)) {
      fs.mkdirSync(distData, { recursive: true })
    }

    fs.cpSync(srcData, distData, { recursive: true })
    console.log("✓ Data files copied successfully")
  } else {
    console.warn("⚠ Source data directory not found")
  }
} catch (error) {
  console.error("✗ Error copying data files:", error)
  process.exit(1)
}
