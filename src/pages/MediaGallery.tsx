import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "yet-another-react-lightbox";

interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
}

const MediaGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [index, setIndex] = useState(-1);

  const IMAGES_PER_LOAD = 20;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:5000/gallery");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchImages();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + IMAGES_PER_LOAD);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Media Gallery</h1>

      {/* Photos Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Photos from Past Trainings
        </h2>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {images.slice(0, visibleCount).map((img, i) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-xl shadow-md cursor-pointer group"
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

        {/* Load More */}
        {visibleCount < images.length && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-80 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({ src: img.src }))}
        index={index}
      />

      {/* Videos Section (UNCHANGED) */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Videos from Past Trainings
        </h2>

        <div className="space-y-6">
          <div>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/example_video_1"
              title="YouTube video 1"
              className="rounded-xl shadow-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/example_video_2"
              title="YouTube video 2"
              className="rounded-xl shadow-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;