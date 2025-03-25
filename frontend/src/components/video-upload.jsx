import React, { useState } from "react";
import { $api } from "../utils";

const VideoUploader = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("other");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = ["sport", "comedy", "music", "other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const videoData = { title, description, url, category };

    try {
      const response = await $api.post("/videos/create", videoData);
      setMessage("Video muvaffaqiyatli yuklandi!");
      setTitle("");
      setDescription("");
      setUrl("");
      setCategory("other");
    } catch (error) {
      setMessage("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Video Yuklash</h2>
      {message && <p className="text-center text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sarlavha"
          className="w-full p-2 border rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Tavsif"
          className="w-full p-2 border rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="url"
          placeholder="Video URL"
          className="w-full p-2 border rounded mb-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border rounded mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Yuklanmoqda..." : "Yuklash"}
        </button>
      </form>
    </div>
  );
};

export default VideoUploader;
