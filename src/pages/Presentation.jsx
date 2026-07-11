import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Presentation.css";
import usePresentationControls from "../hooks/usePresentationControls";
import { listenPresentation } from "../services/presentationService";

function Presentation({ songs }) {
  const { id } = useParams();

  const presentationRef = useRef();

  const song = songs.find(
    (song) => song.id === id
  );

 const slides = song?.lyrics
  ?.split("\n\n")
  .filter((slide) => slide.trim() !== "") || [];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    usePresentationControls(
  slides,
  setCurrentSlide,
  presentationRef
);
useEffect(() => {
  const unsubscribe = listenPresentation((data) => {
    if (data && data.song && data.song.id === song.id) {
      setCurrentSlide(data.currentSlide);
    }
  });

  return () => unsubscribe();
}, [song]);
  
    useEffect(() => {
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };
  

  document.addEventListener(
    "fullscreenchange",
    handleFullscreenChange
  );

  return () => {
    document.removeEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );
  };
}, []);

 

  if (!song) {
    return <h1>Song Not Found</h1>;
  }

  return (
    <div
      ref={presentationRef}
      className="presentation-container"
      
    >
      {!isFullscreen && (
  <button
    className="fullscreen-btn"
    onClick={() =>
      presentationRef.current.requestFullscreen()
    }>
    ⛶ Full Screen
  </button>
)}

      {currentSlide === 0 && (
  <h1
    className="presentation-title">
    {song.title}
  </h1>
)}

      <pre
        className="presentation-lyrics"
      >
        {slides[currentSlide]}
      </pre>

      {!isFullscreen && (
  <h3
    className="slide-counter"
  >
    Slide {currentSlide + 1} / {slides.length}
  </h3>
)}

      {!isFullscreen && (
  <p
    className="presentation-help"
  >
    ← → Navigate Slides | Press F for Full Screen
  </p>
)}
    </div>
  );
}

export default Presentation;