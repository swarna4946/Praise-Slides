import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

function Presentation({ songs }) {
  const { id } = useParams();

  const presentationRef = useRef();

  const song = songs.find(
    (song) => song.id === parseInt(id)
  );

  const slides = song?.lyrics
    ?.split("\n\n")
    .filter((slide) => slide.trim() !== "") || [];

  const [currentSlide, setCurrentSlide] =
    useState(0);

 useEffect(() => {

  const handleKeyDown = (e) => {

    if (e.key === "ArrowRight") {
      setCurrentSlide((prev) =>
        prev < slides.length - 1
          ? prev + 1
          : prev
      );
    }

    if (e.key === "ArrowLeft") {
      setCurrentSlide((prev) =>
        prev > 0
          ? prev - 1
          : prev
      );
    }

    if (
      e.key.toLowerCase() === "f" &&
      presentationRef.current
    ) {
      presentationRef.current.requestFullscreen();
    }

  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };

}, [slides.length]);

  if (!song) {
    return <h1>Song Not Found</h1>;
  }

  return (
    <div
      ref={presentationRef}
      className="presentation-container"
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <button
        className="fullscreen-btn"
        onClick={() =>
          presentationRef.current.requestFullscreen()
        }
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#D4AF37",
          color: "#1E3A5F",
          border: "none",
          padding: "12px 24px",
          borderRadius: "12px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        ⛶ Full Screen
      </button>

      <h1
        style={{
          color: "#D4AF37",
          marginBottom: "30px"
        }}
      >
        {song.title}
      </h1>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "36px",
          lineHeight: "1.6",
          fontFamily: "inherit"
        }}
      >
        {slides[currentSlide]}
      </pre>

      <h3
        style={{
          marginTop: "30px",
          color: "#ccc"
        }}
      >
        Slide {currentSlide + 1} / {slides.length}
      </h3>

      <p
        style={{
          opacity: 0.6,
          fontSize: "16px"
        }}
      >
        ← → Navigate Slides | Press F for Full Screen
      </p>
    </div>
  );
}

export default Presentation;