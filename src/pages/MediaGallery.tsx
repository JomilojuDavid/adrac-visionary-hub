import React from 'react';

const MediaGallery = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Media Gallery</h1>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Photos from Past Trainings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Example Photo Items */}
          <img src="/path/to/photo1.jpg" alt="Training Photo 1" className="rounded shadow-lg" />
          <img src="/path/to/photo2.jpg" alt="Training Photo 2" className="rounded shadow-lg" />
          <img src="/path/to/photo3.jpg" alt="Training Photo 3" className="rounded shadow-lg" />
          {/* Add more photos as needed */}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Videos from Past Trainings</h2>
        <div className="mt-4">
          {/* Example Video Items */}
          <div className="mb-4">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/example_video_1" title="YouTube video 1" className="rounded" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div className="mb-4">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/example_video_2" title="YouTube video 2" className="rounded" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          {/* Add more videos as needed */}
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;