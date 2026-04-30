import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
}

interface GalleryVideo {
  id: string;
  src: string;
  poster: string;
  width: number;
  height: number;
}

const MediaGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const loadMore = () => setVisibleCount((p) => p + IMAGES_PER_LOAD);

  const breakpointColumnsObj = { default: 4, 1100: 3, 768: 2, 500: 1 };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-heading">Media Gallery</h1>

      {/* Photos */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 font-heading">
          Photos from Past Trainings
        </h2>

        {loading && <p className="text-muted-foreground">Loading gallery…</p>}
        {error && <p className="text-destructive">{error}</p>}
        {!loading && !error && images.length === 0 && (
          <p className="text-muted-foreground">No photos available yet.</p>
        )}

        {images.length > 0 && (
          <>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-4"
              columnClassName="flex flex-col gap-4"
            >
              {images.slice(0, visibleCount).map((img, i) => (
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

            {visibleCount < images.length && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({ src: img.src }))}
        index={index}
      />

      {/* Videos */}
      {videos.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 font-heading">
            Videos from Past Trainings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
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
    </div>
  );
};

export default MediaGallery;
