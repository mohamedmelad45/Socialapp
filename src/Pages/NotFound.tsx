import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 text-center">
      <span aria-hidden="true" className="mb-4 text-6xl">
        😳
      </span>
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        Oops
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        404 Not Found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        We couldn't find the page you were looking for.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
      >
        Back to Home
      </Link>
    </section>
  );
}