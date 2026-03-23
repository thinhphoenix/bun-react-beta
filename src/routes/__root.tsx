import { createRootRoute, Outlet, Link } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="flex gap-4 p-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </nav>
      <hr />
      <Outlet />
    </>
  ),
})