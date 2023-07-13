import React, { useState } from "react";

const VideoModal = ({ videoURL }) => {
  return (
    <div className='aspect-w-16 aspect-h-9'>
      <iframe
        width='560'
        height='315'
        src={videoURL}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VideoModal;
