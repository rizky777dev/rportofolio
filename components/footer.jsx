export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-[1] border-t border-border bg-bg">
      <div className="section-inner flex flex-col items-center gap-1 py-8 text-center text-sm text-text-muted">
        <p>&copy; {year} Rizky Irawan. Crafted line by line, pixel by pixel.</p>
      </div>
    </footer>
  );
}
