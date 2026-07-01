import React, { useEffect, useMemo, useState } from "react";
import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "yet-another-react-lightbox";
import { Folder, ArrowLeft } from "lucide-react";
import "yet-another-react-lightbox/styles.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
  created_at?: string;
}

interface GalleryVideo {
  id: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  created_at?: string;
}

type FolderKey = "march" | "june";

const FOLDERS: { key: FolderKey; name: string; months: number[] }[] = [
  { key: "march", name: "Lagos FRC Training (March Edition)", months: [2, 3, 4] }, // Mar-May
  { key: "june", name: "Lagos FRC Training (June Edition)", months: [5] }, // June
];

const MediaGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFolder, setOpenFolder] = useState<FolderKey | null>(null);

  const IMAGES_PER_LOAD = 20;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("cloudinary-gallery");
        if (error) throw error;
        setImages(data.images ?? []);
        setVideos(data.videos ?? []);
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError("Could not load gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const grouped = useMemo(() => {
    const bucket: Record<FolderKey, { images: GalleryImage[]; videos: GalleryVideo[] }> = {
      march: { images: [], videos: [] },
      june: { images: [], videos: [] },
    };
    const inMonths = (dateStr: string | undefined, months: number[]) => {
      if (!dateStr) return false;
      const m = new Date(dateStr).getMonth();
      return months.includes(m);
    };
    for (const f of FOLDERS) {
      bucket[f.key].images = images.filter((i) => inMonths(i.created_at, f.months));
      bucket[f.key].videos = videos.filter((v) => inMonths(v.created_at, f.months));
    }
    return bucket;
  }, [images, videos]);

  const loadMore = () => setVisibleCount((p) => p + IMAGES_PER_LOAD);
  const breakpointColumnsObj = { default: 4, 1100: 3, 768: 2, 500: 1 };

  const currentFolder = openFolder ? FOLDERS.find((f) => f.key === openFolder)! : null;
  const currentImages = openFolder ? grouped[openFolder].images : [];
  const currentVideos = openFolder ? grouped[openFolder].videos : [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-heading">Media Gallery</h1>

      {loading && <p className="text-muted-foreground">Loading gallery…</p>}
      {error && <p className="text-destructive">{error}</p>}

      {!loading && !error && !openFolder && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FOLDERS.map((f) => {
            const count = grouped[f.key].images.length + grouped[f.key].videos.length;
            return (
              <button
                key={f.key}
                onClick={() => {
                  setOpenFolder(f.key);
                  setVisibleCount(IMAGES_PER_LOAD);
                }}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl border bg-card hover:bg-accent/10 hover:border-primary transition shadow-sm hover:shadow-md"
              >
                <Folder className="w-20 h-20 text-primary group-hover:scale-105 transition" strokeWidth={1.5} />
                <span className="font-heading font-semibold text-center leading-snug">
                  {f.name}
                </span>
                <span className="text-xs text-muted-foreground">{count} item{count === 1 ? "" : "s"}</span>
              </button>
            );
          })}
        </div>
      )}

      {!loading && !error && openFolder && currentFolder && (
        <div>
          <button
            onClick={() => setOpenFolder(null)}
            className="inline-flex items-center gap-2 mb-6 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to folders
          </button>
          <h2 className="text-2xl font-semibold mb-6 font-heading">{currentFolder.name}</h2>

          {currentImages.length === 0 && currentVideos.length === 0 && (
            <p className="text-muted-foreground">No media in this folder yet.</p>
          )}

          {currentImages.length > 0 && (
            <section className="mb-12">
              <h3 className="text-lg font-semibold mb-4 font-heading">Photos</h3>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-4"
                columnClassName="flex flex-col gap-4"
              >
                {currentImages.slice(0, visibleCount).map((img, i) => (
                  <div
                    key={img.id}
                    className="overflow-hidden rounded-xl shadow-md cursor-pointer group bg-muted"
                    onClick={() => setIndex(i)}
                  >
                    <LazyLoadImage
                      src={img.src}
                      alt="Gallery"
                      effect="blur"
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </Masonry>

              {visibleCount < currentImages.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </section>
          )}

          {currentVideos.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4 font-heading">Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentVideos.map((v) => (
                  <video
                    key={v.id}
                    src={v.src}
                    poster={v.poster}
                    controls
                    preload="none"
                    className="w-full rounded-xl shadow-md bg-black aspect-video"
                  />
                ))}
              </div>
            </section>
          )}

          <Lightbox
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={currentImages.map((img) => ({ src: img.src }))}
            index={index}
          />
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
