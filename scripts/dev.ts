import { spawn } from "child_process"
import { $ } from "bun"

async function generateRoutes() {
  try {
    await $`bunx tsr generate`.quiet()
  } catch {
    // Ignore errors (file locked)
  }
}

await generateRoutes()

const processes = [
  spawn("bun", ["scripts/route-watcher.ts"], { stdio: "inherit", shell: true }),
  spawn("bun", ["--hot", "src/server.ts"], { stdio: "inherit", shell: true }),
]

setInterval(generateRoutes, 2000)

console.log("🚀 Dev server running")
console.log("👀 Auto-generating routes every 2s")

process.on("SIGINT", () => {
  processes.forEach(p => p.kill())
  process.exit()
})