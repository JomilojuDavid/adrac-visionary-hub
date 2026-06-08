import { ReactNode } from "react";
import Navbar from "./Navbar";
import DefactConfywillsFooter from "./DefactConfywillsFooter";

const DefactConfywillsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <DefactConfywillsFooter />
    </div>
  );
};

export default DefactConfywillsLayout;
