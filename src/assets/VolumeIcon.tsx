import React from "react";

function VolumeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      strokeWidth="3"
      stroke="#ffffff"
      fill="none"
      className="duration-300 transform transition-all"
      style={{ width: "30px", height: "30px" }}>
      <path
        d="M37 50l-13.71-9.87h-8.4V24.8h7.55L37 15.6a.39.39 0 01.59.33v33.75A.4.4 0 0137 50z"
        strokeLinecap="square"></path>
      <path d="M42.43 32.08h9.54M41.89 37.03l8.26 4.77M50.69 22.5l-8.26 4.77"></path>
    </svg>
  );
}

export default VolumeIcon;
