import { watch } from "fs"
import { existsSync, writeFileSync, readFileSync } from "fs"
import { join, parse } from "path"

const routesDir = join(import.meta.dir, "../src/routes")

const template = (routeName: string) => `import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/${routeName}")({
  component: function ${capitalize(routeName)}() {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">${capitalize(routeName)}</h1>
      </div>
    )
  },
})
`

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function isEmptyFile(filePath: string): boolean {
  if (!existsSync(filePath)) return true
  try {
    const content = readFileSync(filePath, "utf-8")
    return content.trim().length === 0
  } catch {
    return true
  }
}

const recentlyWritten = new Set<string>()

watch(routesDir, (event, filename) => {
  if (!filename || !filename.endsWith(".tsx") || filename.startsWith("__")) return
  if (filename === "index.tsx") return

  const filePath = join(routesDir, filename)

  if (event === "rename" && !existsSync(filePath)) {
    recentlyWritten.delete(filename)
    return
  }

  if (recentlyWritten.has(filename)) return

  if (isEmptyFile(filePath)) {
    const routeName = parse(filename).name
    writeFileSync(filePath, template(routeName))
    recentlyWritten.add(filename)
    console.log(`✓ Created route template: ${filename}`)
    console.log(`  Route will be available in ~2 seconds`)
  }
})

console.log("👀 Watching for new route files in src/routes/")