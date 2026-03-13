import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import calebsLogo from "@/assets/calebs-logo.jpeg";

const navItems = [
  { label: "Home", path: "/calebs-apartments" },
  { label: "Book Now", path: "/calebs-apartments/book" },
  { label: "← Back to ADRAC", path: "/" },
];

const CalebsNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-calebs-rose/20">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/calebs-apartments" className="flex items-center gap-3">
          <img src={calebsLogo} alt="Caleb's Apartments & Suites" className="h-14 w-auto rounded-lg" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-calebs-rose/10 hover:text-calebs-maroon ${
                  location.pathname === item.path ? "text-calebs-maroon bg-calebs-rose/10" : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-calebs-rose/20 animate-fade-in">
          <ul className="flex flex-col px-4 py-4 gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-calebs-rose/10 hover:text-calebs-maroon"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default CalebsNavbar;
