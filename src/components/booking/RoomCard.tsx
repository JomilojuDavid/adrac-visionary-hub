import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Maximize, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface RoomCardProps {
  value: string;
  label: string;
  price: number;
  image: string;
  galleryUrl?: string;
  description: string;
  maxGuests: number;
  size: string;
  features: string[];
  selected: boolean;
  onSelect: (value: string) => void;
}

interface CloudinaryGalleryResponse {
  images?: { id: string; src: string }[];
}

const folderByRoom: Record<string, string> = {
  "calebs-3bed": "Caleb Apartment/3 Bedroom Ensuite Caleb Apartment",
  "calebs-2bed": "Caleb Apartment/2 Bedroom Ensuite Caleb Apartment",
  "calebs-1bed-exec": "Caleb Apartment/1 Bedroom Executive Ensuite Caleb Apartment",
  "calebs-1bed-deluxe": "Caleb Apartment/1 Bedroom Deluxe Ensuite Caleb Apartment",
  "calebs-1bed-std": "Caleb Apartment/1 Bedroom Standard Ensuite Caleb Apartment",
  "arnold-2bed": "Caleb Apartment/Arnold House",
  "arnold-1bed": "Caleb Apartment/Arnold House",
};

const galleryRequests = new Map<string, Promise<string[]>>();

const getFolderImages = (folder: string): Promise<string[]> => {
  const cachedRequest = galleryRequests.get(folder);
  if (cachedRequest) return cachedRequest;

  const request = supabase.functions
    .invoke<CloudinaryGalleryResponse>("cloudinary-gallery", { body: { folder } })
    .then(({ data, error }) => {
      if (error) throw error;
      return (data?.images ?? []).map((image) => image.src).filter(Boolean);
    });

  galleryRequests.set(folder, request);
  return request;
};

const RoomCard = ({ value, label, price, image, description, maxGuests, size, features, selected, onSelect }: RoomCardProps) => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState(image);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const folder = folderByRoom[value];

  useEffect(() => {
    let cancelled = false;

    if (!folder) {
      setGalleryLoading(false);
      return;
    }

    getFolderImages(folder)
      .then((images) => {
        if (cancelled) return;
        setGalleryImages(images);
        if (images.length > 0) {
          setCoverImage(images[Math.floor(Math.random() * images.length)]);
        }
      })
      .catch((error) => {
        console.error(`Could not load Cloudinary photos for ${label}:`, error);
      })
      .finally(() => {
        if (!cancelled) setGalleryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [folder, label, image]);

  return (
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
        <img src={coverImage} alt={label} className="w-full h-full object-cover" loading="lazy" />
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
          {features.map((feature) => (
            <span key={feature} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{feature}</span>
          ))}
        </div>

        <div className="border-t border-border pt-3" onClick={(event) => event.stopPropagation()}>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-2">Apartment photos</h4>
          {galleryLoading ? (
            <p className="text-xs text-muted-foreground">Loading photos…</p>
          ) : galleryImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((src, index) => (
                <a
                  key={`${src}-${index}`}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`View photo ${index + 1} of ${label}`}
                  className="block h-20 overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <img
                    src={src}
                    alt={`${label} photo ${index + 1}`}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No additional photos available.</p>
          )}
        </div>

        <div className="pt-2 border-t border-border">
          <span className="font-heading font-bold text-foreground text-xl">₦{price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground"> / night</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
