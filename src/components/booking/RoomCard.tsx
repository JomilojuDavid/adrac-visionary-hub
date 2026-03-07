import { motion } from "framer-motion";
import { Users, Maximize, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  value: string;
  label: string;
  price: number;
  image: string;
  description: string;
  maxGuests: number;
  size: string;
  features: string[];
  selected: boolean;
  onSelect: (value: string) => void;
}

const RoomCard = ({ value, label, price, image, description, maxGuests, size, features, selected, onSelect }: RoomCardProps) => (
  <motion.div
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(value)}
    className={cn(
      "cursor-pointer rounded-xl border-2 overflow-hidden transition-all duration-300",
      selected
        ? "border-gold shadow-lg shadow-gold/10"
        : "border-border hover:border-muted-foreground/30"
    )}
  >
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={label} className="w-full h-full object-cover" loading="lazy" />
      {selected && (
        <div className="absolute top-3 right-3 bg-gold text-gold-foreground rounded-full p-1.5">
          <Check className="w-4 h-4" />
        </div>
      )}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
        <h3 className="font-heading font-bold text-primary-foreground text-lg">{label}</h3>
      </div>
    </div>
    <div className="p-4 space-y-3">
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Up to {maxGuests}</span>
        <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {size}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {features.map((f) => (
          <span key={f} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{f}</span>
        ))}
      </div>
      <div className="pt-2 border-t border-border">
        <span className="font-heading font-bold text-foreground text-xl">₦{price.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground"> / night</span>
      </div>
    </div>
  </motion.div>
);

export default RoomCard;
