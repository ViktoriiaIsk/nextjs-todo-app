import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            T
          </div>
          <span className="text-xl font-bold text-foreground">TodoApp</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            <li>
              <Link 
                href="/" 
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/todos" 
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md"
              >
                Todos
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
