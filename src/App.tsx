import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Training = lazy(() => import("./pages/Training"));
const Contact = lazy(() => import("./pages/Contact"));
const FounderProfile = lazy(() => import("./pages/FounderProfile"));
const Insights = lazy(() => import("./pages/Insights"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Collaborations = lazy(() => import("./pages/Collaborations"));
const AdracBusinessSchool = lazy(() => import("./pages/AdracBusinessSchool"));
const DefactConsult = lazy(() => import("./pages/DefactConsult"));
const DefactConfywills = lazy(() => import("./pages/DefactConfywills"));
const CalebsApartments = lazy(() => import("./pages/CalebsApartments"));
const BookCalebsApartments = lazy(() => import("./pages/BookCalebsApartments"));
const TrainingRegistration = lazy(() => import("./pages/TrainingRegistration"));
const MediaGallery = lazy(() => import("./pages/MediaGallery"));
const JobListings = lazy(() => import("./pages/JobListings"));
const PostJob = lazy(() => import("./pages/PostJob"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/training" element={<Training />} />
            <Route path="/training/register/:trainingId" element={<TrainingRegistration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/founder" element={<FounderProfile />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/collaborations" element={<Collaborations />} />
            <Route path="/adrac-business-school" element={<AdracBusinessSchool />} />
            <Route path="/defact-consult" element={<DefactConsult />} />
            <Route path="/defact-confywills" element={<DefactConfywills />} />
            <Route path="/calebs-apartments" element={<CalebsApartments />} />
            <Route path="/calebs-apartments/book" element={<BookCalebsApartments />} />
            <Route path="/media-gallery" element={<MediaGallery />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/post" element={<PostJob />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
