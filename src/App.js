import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect ,} from "react";

import "./App.css";
import Home from "./pages/Home";
import Songlist from "./pages/SongList";
import Navbar from "./components/Navbar";
import Songdetails from "./pages/SongDetails";
import Presentation from "./pages/Presentation";
import AddSong from "./pages/AddSong";
import Favorites from "./pages/Favorites";

import EditSong from "./pages/EditSong";
import Controller from "./pages/Controller";

import { getSongs,addSongToDB,deleteSongFromDB ,
  updateSongInDB,
  getFavorites,
  addFavoriteToDB,
  removeFavoriteFromDB


} from "./services/songService";

function App() {

const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});
useEffect(() => {
  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );

  document.body.className = darkMode
    ? "dark-theme"
    : "light-theme";
}, [darkMode]);

const [songs, setSongs] = useState([]);

const [favorites, setFavorites] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const loadSongs = async () => {
    setLoading(true);
    const data = await getSongs();

    setSongs(data);

    setLoading(false);
  };

  loadSongs();
}, []);
const addSong = async (newSong) => {
  await addSongToDB(newSong);

  const data = await getSongs();

  setSongs(data);
  toast.success("Song added successfully!");
};

const deleteSong = async (id) => {
  await deleteSongFromDB(id);

  const data = await getSongs();

  setSongs(data);

  setFavorites(
    favorites.filter(
      (fav) => fav.id !== id
    )
  );
  toast.success("Song deleted!")
};

 const addFavorite = async (song) => {
  const exists = favorites.find(
    (fav) => fav.songId === song.id
    
  );

  if (exists) {
    await removeFavoriteFromDB(song.id);
    toast.info("Removed from Favourites")
  } else {
    await addFavoriteToDB({
      songId: song.id,
      title: song.title,
      language: song.language,
      category: song.category,
    });
    toast.success("Added to Favorites❤️")
  }

  const data = await getFavorites();
  setFavorites(data);
};

const exportSongs = () => {
  const exportData = songs.map(
    ({ id, ...song }) => song
  );

  const data = JSON.stringify(
    exportData,
    null,
    2
  );

  const blob = new Blob([data], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const today = new Date().toISOString().split("T")[0];

  link.href = url;
  link.download = `Praise_Slides_${today}.json`;

  link.click();

  URL.revokeObjectURL(url);

  toast.success("Songs exported successfully! 📤");
};
const importSongs = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (e) => {
  try {
    const importedSongs = JSON.parse(e.target.result);

    // Current songs from Firebase
    const existingSongs = await getSongs();

    let importedCount = 0;
    let skippedCount = 0;

    for (const song of importedSongs) {
      const exists = existingSongs.some(
        (s) =>
          s.title.trim().toLowerCase() ===
            song.title.trim().toLowerCase() &&
          s.language === song.language
      );

      if (!exists) {
        await addSongToDB({
          title: song.title,
          language: song.language,
          category: song.category,
          lyrics: song.lyrics,
        });

        importedCount++;
      } else {
        skippedCount++;
      }
    }

    const data = await getSongs();
    setSongs(data);

    toast.success(
      `${importedCount} song(s) imported 🎉`
    );

    if (skippedCount > 0) {
      toast.info(
        `${skippedCount} duplicate song(s) skipped`
      );
    }

  } catch (error) {
    toast.error("Invalid JSON file!");
  }
};

  reader.readAsText(file);
};

if (loading) {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <h2>Loading Praise Slides...</h2>
    </div>
  );
}


  return (
    <div >
    <BrowserRouter>

      <Navbar exportSongs={exportSongs}
      importSongs={importSongs}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      />

      <Routes>
        <Route
          path="/song/:id"
          element={<Songdetails songs={songs} />}
        />

        <Route
          path="/presentation/:id"
          element={<Presentation songs={songs} />}
        />

        <Route
          path="/add-song"
          element={<AddSong addSong={addSong} />}
        />
        <Route
          path="/songs"
          element={<Songlist songs={songs} deleteSong={deleteSong} 
          addFavorite={addFavorite}
          favorites={favorites}
          />}
        />


        <Route path="/" element={<Home songs={songs} />}
        />

        <Route path="/favorites" element={<Favorites favorites={favorites} />}
        />

        <Route
  path="/controller"
  element={<Controller songs={songs} />}
/>

         <Route path="/edit/:id" element={
            <EditSong songs={songs}
                      setSongs={setSongs}
                      getSongs={getSongs}
                      updateSongInDB={updateSongInDB}
            />
         } />

        
      
      </Routes>

    </BrowserRouter>
    <ToastContainer 
    position="top-right"
    autoClose={2000}
    />
    </div>
  );
}

export default App;