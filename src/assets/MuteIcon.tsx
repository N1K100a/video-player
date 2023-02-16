import React from "react";

function MuteIcon() {
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
        d="M35.36 49.2l-13.71-9.88h-8.4V24h7.55l14.58-9.2a.39.39 0 01.59.33v33.75a.39.39 0 01-.61.32z"
        strokeLinecap="square"></path>
      <path d="M40.64 26.73l10.55 10.54M40.64 37.27l10.55-10.54"></path>
    </svg>
  );
}

export default MuteIcon;
