# AGENTS.md - Development Guidelines

## Project Overview
Bun + React + Tailwind CSS template using Bun runtime. No test framework configured.

## Commands

### Development
```bash
bun install              # Install dependencies
bun dev                  # Start dev server with hot reload (--hot flag)
bun start                # Start production server
```

### Build
```bash
bun run build.ts                        # Build for production
bun run build.ts --outdir=dist          # Custom output directory
bun run build.ts --minify               # Enable minification
bun run build.ts --sourcemap=linked     # Generate source maps
bun run build.ts --target=browser       # Build target (browser|bun|node)
bun run build.ts --format=esm           # Output format (esm|cjs|iife)
bun run build.ts --external=react,react-dom  # Mark packages as external
bun run build.ts --splitting            # Enable code splitting
bun run build.ts --packages=bundle      # Package handling (bundle|external)
bun run build.ts --public-path=/assets  # Public path for assets
bun run build.ts --env=inline           # Environment handling
bun run build.ts --banner="/* v1.0 */"  # Add banner to output
bun run build.ts --footer="/* EOF */"   # Add footer to output
bun run build.ts --define.VERSION=1.0.0 # Define global constants
bun run build.ts --help                 # Show all options
```

### Testing
No test framework configured. Add tests as needed.

## Code Style

### Imports
- Use ES modules (`import/export`)
- Absolute imports via path alias: `@/components/Button`
- React imports: `import { useRef, type FormEvent } from "react"`
- Type imports use `type` keyword: `import type { Props } from "./types"`
- CSS imports: `import "./index.css"`
- Asset imports: `import logo from "./logo.svg"`

### Formatting
- No semicolons (except where required)
- Double quotes for strings
- Trailing commas in multi-line objects/arrays
- 2-space indentation
- Max line length: 120 characters
- Arrow functions for event handlers and callbacks

### TypeScript
- Strict mode enabled (`strict: true`)
- Use `type` for type aliases, `interface` for object shapes
- Explicit return types for exported functions
- Generic types for refs: `useRef<HTMLTextAreaElement>(null)`
- Event types: `FormEvent<HTMLFormElement>`, `MouseEvent<HTMLButtonElement>`
- Non-null assertion when certain: `document.getElementById("root")!`

### Naming Conventions
- Components: PascalCase (`App`, `APITester`)
- Functions/variables: camelCase (`testEndpoint`, `responseInputRef`)
- CSS classes: KEBAB_CASE in Tailwind (`text-center`, `flex-col`)
- Files: PascalCase for components (`App.tsx`), camelCase otherwise
- Exports: Named exports preferred (`export function App()`)

### React Patterns
- Functional components only
- Hooks: `useRef`, `useState`, `useEffect` (as needed)
- Component structure: imports → component → export
- Props typing inline or via interface
- Keys on list items when mapping
- Use `export function Component()` pattern for tree-shaking
- Destructure props in function signature: `function Component({ prop })`
- Keep components small and focused on single responsibility

### Error Handling
- Try/catch for async operations
- Convert errors to strings: `String(error)`
- Display errors in UI when user-facing
- Log errors in development

### CSS/Tailwind
- Tailwind v4 with `@import "tailwindcss"`
- Use `@layer base` for global styles
- Custom animations defined with `@keyframes`
- Respect `prefers-reduced-motion` media query
- Utility classes over custom CSS when possible

### File Structure
```
src/
  index.ts          # Server entry point
  frontend.tsx      # Client entry point
  App.tsx           # Main React component
  *.tsx             # React components
  index.css         # Global styles
  index.html        # HTML template
  *.svg             # Static assets
```

### Component Example
```tsx
import { useRef, type FormEvent } from "react";
import "./styles.css";

export function MyComponent({ title, onAction }: { title: string; onAction: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      onAction();
    } catch (error) {
      console.error(String(error));
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" className="border rounded p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
```

### API Route Example
```ts
// Server-side routing in index.ts
const server = serve({
  routes: {
    "/api/users": async (req) => {
      return Response.json({ users: [] });
    },
    "/api/users/:id": async (req) => {
      const id = req.params.id;
      return Response.json({ id });
    },
  },
});
```

### Running Single Tests
No test framework is configured. To add tests:
1. Install a test runner: `bun add -d vitest` or `bun add -d @jest/globals`
2. Add test script to package.json: `"test": "vitest"`
3. Run single test: `bun test path/to/test.ts` or `bun vitest path/to/test.ts`

### Linting
No linter is configured. To add ESLint:
1. Install: `bun add -d eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
2. Create `.eslintrc.cjs` configuration
3. Add script: `"lint": "eslint src/"`
4. Run: `bun run lint`

## Architecture Notes
- Server-side routing in `index.ts` with Bun.serve()
- API routes: `/api/hello`, `/api/hello/:name`
- Client-side React app rendered to `#root` element
- HMR enabled in development via `--hot` flag
- Production builds output to `dist/` directory

## No Cursor/Copilot Rules
No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` files present.
