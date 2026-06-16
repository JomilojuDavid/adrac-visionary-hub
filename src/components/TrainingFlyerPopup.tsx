import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import trainingNotice from "@/assets/frc-training-notice.jpeg";

const DISMISSED_KEY = "adrac_training_flyer_dismissed";

const TrainingFlyerPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!dismissed) {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  const goToTraining = () => {
    dismiss();
    navigate("/training");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-background rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur rounded-full p-1.5 hover:bg-destructive hover:text-destructive-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div onClick={goToTraining} className="cursor-pointer">
              <img
                src={trainingNotice}
                alt="FRC & ADRAC 2-Day Capacity Building – Emerging Trends in Valuation, Financial Reporting and Regulatory Oversight in Nigeria"
                className="w-full h-auto rounded-xl"
              />
            </div>

            <div className="p-4 text-center">
              <button
                onClick={goToTraining}
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-6 py-2.5 rounded-lg transition-all hover:scale-105"
              >
                View Training Details
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrainingFlyerPopup;
