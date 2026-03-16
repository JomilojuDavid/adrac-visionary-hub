import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Briefcase, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_DELAY = 5 * 60 * 1000; // 5 minutes
const DISMISSED_KEY = "adrac_job_popup_dismissed";

const JobBoardPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setOpen(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  const goTo = (path: string) => {
    dismiss();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-background rounded-2xl shadow-2xl max-w-lg w-full p-8 relative border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                ADRAC Job Board
              </h2>
              <p className="text-muted-foreground text-sm">
                Connect top talent with leading organisations. How can we help you today?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => goTo("/jobs/post")}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-cta/10 flex items-center justify-center group-hover:bg-cta/20 transition-colors">
                  <Users className="w-6 h-6 text-cta" />
                </div>
                <span className="font-heading font-semibold text-foreground">I'm a Recruiter</span>
                <span className="text-muted-foreground text-xs text-center">
                  Post job openings and find qualified candidates
                </span>
              </button>

              <button
                onClick={() => goTo("/jobs")}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-gold hover:bg-gold/5 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-gold" />
                </div>
                <span className="font-heading font-semibold text-foreground">I'm a Job Seeker</span>
                <span className="text-muted-foreground text-xs text-center">
                  Browse available job openings and apply
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobBoardPopup;
