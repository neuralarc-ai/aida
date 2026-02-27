import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Aida
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/analytics"
            className="text-sm hover:text-primary transition-colors"
          >
            Analytics
          </Link>
          <Link
            href="/settings"
            className="text-sm hover:text-primary transition-colors"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
