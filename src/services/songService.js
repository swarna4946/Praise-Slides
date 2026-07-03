import { db } from "../firebase";


import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where
} from "firebase/firestore";

// Firestore collection
const songsCollection = collection(db, "songs");
const favoritesCollection = collection(db, "favorites");

// Get all songs
export const getSongs = async () => {
  const snapshot = await getDocs(songsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Add song
export const addSongToDB = async (song) => {
  await addDoc(songsCollection, song);
};

// Delete song
export const deleteSongFromDB = async (id) => {
  await deleteDoc(doc(db, "songs", id));
};

// Update song
export const updateSongInDB = async (id, song) => {
  await updateDoc(doc(db, "songs", id), song);
};
// Get favorites
export const getFavorites = async () => {
  const snapshot = await getDocs(favoritesCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Add favorite
export const addFavoriteToDB = async (song) => {
  await addDoc(favoritesCollection, song);
};

// Remove favorite
export const removeFavoriteFromDB = async (songId) => {
  const q = query(
    favoritesCollection,
    where("songId", "==", songId)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
};
