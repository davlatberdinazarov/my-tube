import React, { useEffect, useState } from "react";
import { $axios } from "../utils";
import ReactPlayer from "react-player";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await $axios.get("/videos/getAll");
        setVideos(response.data);
      } catch (err) {
        setError("Videolarni yuklashda xatolik yuz berdi!");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading)
    return <p className="text-center text-blue-500">Yuklanmoqda...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Barcha Videolar</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {videos.length === 0 ? (
          <p className="text-center text-gray-500">
            Hozircha video mavjud emas.
          </p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{video.category}</p>
              <div className="mb-4">
                <div className="relative w-full h-64">
                  <ReactPlayer
                    playing={false}
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0" // ✅ Faqatgina agar `relative` bo‘lsa ishlaydi
                    controls={true}
                    url={video.url}
                    config={{
                      vimeo: {
                        playerOptions: {
                          byline: false,
                          portrait: false,
                          title: false,
                          color: "ffffff",
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-700">{video.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoList;
