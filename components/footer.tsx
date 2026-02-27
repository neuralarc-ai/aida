export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Aida. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
