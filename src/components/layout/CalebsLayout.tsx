import { ReactNode, useEffect } from "react";
import CalebsNavbar from "./CalebsNavbar";
import CalebsFooter from "./CalebsFooter";

const CalebsLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Swap favicon for Caleb's Apartments pages
    const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    const originalHref = link?.href || "/favicon.ico";
    if (link) link.href = "/calebs-favicon.jpeg";

    // Swap page title
    const originalTitle = document.title;
    document.title = "Caleb's Apartments & Suites";

    return () => {
      if (link) link.href = originalHref;
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col calebs-theme">
      <CalebsNavbar />
      <main className="flex-1">{children}</main>
      <CalebsFooter />
    </div>
  );
};

export default CalebsLayout;
