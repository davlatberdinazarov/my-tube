import React, { useEffect, useState } from "react";
import { $api, $axios } from "../utils";
import ReactPlayer from "react-player";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Auth'dan foydalanuvchi ID ni olish (bu joy o‘zgarishi mumkin)
  const userId = localStorage.getItem("userId"); // Agar context ishlatsangiz, undan oling

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

  const toggleLike = async (videoId) => {
    try {
      const response = await $api.put(`/videos/${videoId}/like`);
      const updatedVideos = videos.map((video) =>
        video._id === videoId
          ? {
              ...video,
              likes: response.data.hasLiked
                ? [...video.likes, userId]
                : video.likes.filter((id) => id !== userId),
            }
          : video
      );
      setVideos(updatedVideos);
    } catch (error) {
      console.error("Like o‘zgartirishda xatolik:", error);
    }
  };

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
          videos.map((video) => {
            const hasLiked = video.likes.includes(userId);
            return (
              <div key={video._id} className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{video.category}</p>
                <div className="mb-4">
                  <ReactPlayer width="100%" height="100%" controls url={video.url} />
                </div>
                <p className="text-sm text-gray-700">{video.title}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                      alt="user"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <p className="ml-4 text-lg text-gray-600">John Doe</p>
                  </div>
                  <button
                    onClick={() => toggleLike(video._id)}
                    className="p-2 rounded flex items-center gap-2"
                  >
                    <span>Likes: {video.likes.length}</span>
                    {hasLiked ? (
                      <FaHeart className="ml-2 text-xl text-red-500" />
                    ) : (
                      <FaRegHeart className="ml-2 text-xl" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VideoList;
