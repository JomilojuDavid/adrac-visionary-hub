import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import adracLogo from "@/assets/adrac-logo.jpg";
import trainingNotice from "@/assets/frc-training-notice.jpeg";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "About ADRAC",
    path: "/about",
    children: [
      { label: "About Us", path: "/about" },
      { label: "Our Services", path: "/services" },
      { label: "Collaborations", path: "/collaborations" },
    ],
  },
  {
    label: "Training",
    path: "/training",
    showNotice: true,
    children: [
      { label: "Training & Programmes", path: "/training" },
      { label: "Training Calendar", path: "/training#calendar" },
      { label: "Media & Gallery", path: "/media-gallery", noNotice: true },
    ],
  },
  {
    label: "Sub-Entities",
    path: "/adrac-business-school",
    children: [
      { label: "ADRAC Business School", path: "/adrac-business-school" },
      { label: "Defact International Consult", path: "/defact-consult" },
      { label: "Defact & Confywills", path: "/defact-confywills" },
      { label: "Caleb's Apartments", path: "/calebs-apartments" },
    ],
  },
  {
    label: "Jobs",
    path: "/jobs",
    children: [
      { label: "Browse Job Openings", path: "/jobs" },
      { label: "Post a Job", path: "/jobs/post" },
    ],
  },
  { label: "Insights", path: "/insights" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Founder", path: "/founder" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showTrainingNotice, setShowTrainingNotice] = useState(false);
  const location = useLocation();

  const handleTrainingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTrainingNotice(true);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <nav className="container mx-auto flex items-center justify-between px-4 py-2 lg:px-6">
          <Link to="/" className="flex items-center shrink-0">
            <img src={adracLogo} alt="ADRAC Consulting Services" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-0">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-0.5 px-2 py-2 text-xs font-medium rounded-md transition-colors hover:bg-primary/5 hover:text-primary whitespace-nowrap ${
                    location.pathname === item.path ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <ul className="absolute top-full left-0 bg-background border border-border rounded-lg shadow-lg py-2 min-w-[200px] animate-fade-in z-50">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        {"showNotice" in item && item.showNotice && !("noNotice" in child && (child as any).noNotice) ? (
                          <button
                            onClick={handleTrainingClick}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {child.label}
                          </button>
                        ) : (
                          <Link
                            to={child.path}
                            className="block px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        )}
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
            <ul className="flex flex-col px-4 py-3 gap-0.5">
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
                          {"showNotice" in item && item.showNotice && !("noNotice" in child && (child as any).noNotice) ? (
                            <button
                              onClick={handleTrainingClick}
                              className="block w-full text-left px-3 py-1.5 text-xs text-muted-foreground hover:text-primary"
                            >
                              {child.label}
                            </button>
                          ) : (
                            <Link
                              to={child.path}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          )}
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

      {/* Training Notice Popup */}
      {showTrainingNotice && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowTrainingNotice(false)}
        >
          <div
            className="relative bg-background rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrainingNotice(false)}
              className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur rounded-full p-1.5 hover:bg-destructive hover:text-destructive-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <Link
              to="/training"
              onClick={() => setShowTrainingNotice(false)}
              aria-label="View training details"
            >
              <img
                src={trainingNotice}
                alt="FRC & ADRAC 2-Day Capacity Building – Emerging Trends in Valuation, Financial Reporting and Regulatory Oversight in Nigeria"
                className="w-full h-auto rounded-xl cursor-pointer"
              />
            </Link>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
