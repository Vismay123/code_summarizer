import React from "react";

const KTSection = () => {
  const videos = [
    {
      title: "Project Overview Session",
      link: "https://www.youtube.com/watch?v=abcd1234",
    },
    {
      title: "Backend Architecture Walkthrough",
      link: "https://drive.google.com/file/d/xyz",
    },
    {
      title: "Frontend Setup Guide",
      link: "https://www.youtube.com/watch?v=wxyz5678",
    },
    {
      title: "Deployment Process",
      link: "/videos/deployment.mp4",
    },
  ];

  return (
    <div className=" w-full bg-gradient-to-br from-gray-50 to-blue-50 p-10 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          📚 Knowledge Transfer Section
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {video.title}
              </h3>
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:text-blue-800 self-end"
              >
                ▶ Watch Video
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KTSection;
