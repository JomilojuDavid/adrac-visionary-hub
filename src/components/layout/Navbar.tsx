import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About ADRAC", path: "/about" },
  { label: "Our Services", path: "/services" },
  {
    label: "Training",
    path: "/training",
    children: [
      { label: "Training & Programmes", path: "/training" },
      { label: "Training Calendar", path: "/training#calendar" },
      { label: "Online Registration", path: "/training#register" },
    ],
  },
  {
    label: "Sub-Entities",
    path: "/adrac-business-school",
    children: [
      { label: "ADRAC Business School", path: "/adrac-business-school" },
      { label: "Defact International Consult", path: "/defact-consult" },
      { label: "Caleb's Apartments", path: "/calebs-apartments" },
    ],
  },
  { label: "Insights", path: "/insights" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Collaborations", path: "/collaborations" },
  { label: "Founder", path: "/founder" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex flex-col">
          <span className="text-xl font-heading font-bold text-primary tracking-tight">ADRAC</span>
          <span className="text-[10px] font-body text-muted-foreground -mt-1 tracking-widest uppercase">Professional Services</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-primary/5 hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-foreground/80"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </Link>
              {item.children && openDropdown === item.label && (
                <ul className="absolute top-full left-0 bg-background border border-border rounded-lg shadow-lg py-2 min-w-[220px] animate-fade-in">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        to={child.path}
                        className="block px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <ul className="flex flex-col px-4 py-4 gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/5 hover:text-primary"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="pl-4">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
