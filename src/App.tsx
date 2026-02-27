import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Training from "./pages/Training";
import Contact from "./pages/Contact";
import FounderProfile from "./pages/FounderProfile";
import Insights from "./pages/Insights";
import CaseStudies from "./pages/CaseStudies";
import Collaborations from "./pages/Collaborations";
import AdracBusinessSchool from "./pages/AdracBusinessSchool";
import DefactConsult from "./pages/DefactConsult";
import CalebsApartments from "./pages/CalebsApartments";
import BookCalebsApartments from "./pages/BookCalebsApartments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/training" element={<Training />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founder" element={<FounderProfile />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/collaborations" element={<Collaborations />} />
          <Route path="/adrac-business-school" element={<AdracBusinessSchool />} />
          <Route path="/defact-consult" element={<DefactConsult />} />
          <Route path="/calebs-apartments" element={<CalebsApartments />} />
          <Route path="/calebs-apartments/book" element={<BookCalebsApartments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
