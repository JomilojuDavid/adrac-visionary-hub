import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import JobBoardPopup from "@/components/JobBoardPopup";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <JobBoardPopup />
    </div>
  );
};

export default Layout;
