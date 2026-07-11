import React, { useEffect, useState } from "react";
import {
  listenPresentation,
  nextSlide,
  previousSlide,
} from "../services/presentationService";

function Controller({ songs }) {
  const [presentation, setPresentation] = useState(null);


  useEffect(() => {
    const unsubscribe = listenPresentation((data) => {
      setPresentation(data);
    });

    return () => unsubscribe();
  }, []);
  if (!presentation || !presentation.song) {
  return (
    <h2 style={{ padding: "30px" }}>
      Waiting for Presentation...
    </h2>
  );
}

const slides = presentation.song.lyrics
  .split("\n\n")
  .filter((slide) => slide.trim() !== "");


  return (
  <div style={{ padding: "30px" }}>
    <h1>🎛 Presenter Controller</h1>

    <h2 style={{ marginTop: "30px" }}>
      {presentation.song.title}
    </h2>

    <p>
      Slide {presentation.currentSlide + 1} / {slides.length}
    </p>

    <pre
      style={{
        marginTop: "25px",
        background: "#1e293b",
        color: "#fff",
        padding: "25px",
        borderRadius: "12px",
        whiteSpace: "pre-wrap",
        fontSize: "28px",
        lineHeight: "1.6",
      }}
    >
      {slides[presentation.currentSlide]}
    </pre>

    <div style={{ marginTop: "25px" }}>
      <button
        onClick={() => previousSlide(presentation)}
      >
        ⬅ Previous
      </button>

      <button
        onClick={() => nextSlide(presentation)}
        style={{ marginLeft: "10px" }}
      >
        Next ➡
      </button>
    </div>
  </div>
);
}

export default Controller;