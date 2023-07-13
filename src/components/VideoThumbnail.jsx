import React, { useState } from "react";
import VideoModal from "./VideoModal";

const VideoThumbnail = ({ videoId }) => {
  console.log(videoId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='video-thumbnail play-button' onClick={openModal}>
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt='Video Thumbnail'
      />
      {isModalOpen && <VideoModal videoId={videoId} closeModal={closeModal} />}
    </div>
  );
};

export default VideoThumbnail;
