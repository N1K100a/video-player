import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import { GlobalStyles } from "./global/globalStyles";
function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <VideoPlayer />
      </div>
    </>
  );
}

export default App;
