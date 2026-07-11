import { db } from "../firebase";
import {
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const presentationRef = doc(
  db,
  "presentation",
  "current"
);

// Start presentation
export const startPresentation = async (song) => {
  await setDoc(presentationRef, {
    song,
    currentSlide: 0,
    isPresenting: true,
    updatedAt: Date.now(),
  });
};

// Listen for changes
export const listenPresentation = (callback) => {
  return onSnapshot(presentationRef, (doc) => {
    callback(doc.data());
  });
};

// Next slide
export const nextSlide = async (presentation) => {
  const slides = presentation.song.lyrics
    .split("\n\n")
    .filter((slide) => slide.trim() !== "");

  if (
    presentation.currentSlide >=
    slides.length - 1
  )
    return;

  await setDoc(presentationRef, {
    ...presentation,
    currentSlide:
      presentation.currentSlide + 1,
    updatedAt: Date.now(),
  });
};

// Previous slide
export const previousSlide = async (presentation) => {
  if (presentation.currentSlide <= 0)
    return;

  await setDoc(presentationRef, {
    ...presentation,
    currentSlide:
      presentation.currentSlide - 1,
    updatedAt: Date.now(),
  });
};