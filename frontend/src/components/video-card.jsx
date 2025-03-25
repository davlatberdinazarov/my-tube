
const VideoCard = ({ video, onLike }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-bold mb-2">{video.title}</h3>
        <video controls className="w-full rounded">
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-gray-600 mt-2">Duration: {video.duration}</p>
        <div className="flex justify-between items-center">
            <img  className="w-12 h-12 object-cover rounded-full" src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D" alt="user image" />
            <p className="ml-4 text-lg text-gray-600">John Doe</p>

        </div>
        <button onClick={() => onLike(video.id)} className="mt-2 bg-blue-500 text-white p-2 rounded">
          Like ({video.likes})
        </button>
      </div>
    );
  };

  export default VideoCard;