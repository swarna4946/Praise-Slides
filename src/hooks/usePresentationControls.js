import { useEffect } from "react";

function usePresentationControls(
  slides,
  setCurrentSlide,
  presentationRef
) {
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
        if (!document.fullscreenElement) {
          presentationRef.current.requestFullscreen();
        }
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
  }, [slides.length, setCurrentSlide, presentationRef]);
}

export default usePresentationControls;