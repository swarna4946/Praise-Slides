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

import songsData from "./data/songs";
import EditSong from "./pages/EditSong";

function App() {

 

  const [songs, setSongs] = useState(() => {
  const savedSongs = localStorage.getItem("songs");
  

  return savedSongs
    ? JSON.parse(savedSongs)
    : songsData;
});

  useEffect(() => {
  localStorage.setItem(
    "songs",
    JSON.stringify(songs)
  );
}, [songs]);
const [favorites, setFavorites] = useState(() => {
  const savedFavorites =
    localStorage.getItem("favorites");

  return savedFavorites
    ? JSON.parse(savedFavorites)
    : [];
});
  useEffect(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}, [favorites]);

  const addSong = (newSong) => {
    setSongs([
      ...songs,
      {
        ...newSong,
        id:Date.now()
      }
    ]);  
};
  const deleteSong = (id) => {

  setSongs(
    songs.filter(
      (song) => song.id !== id
    )
  );

  setFavorites(
    favorites.filter(
      (fav) => fav.id !== id
    )
  );
};
 const addFavorite = (song) => {
  const exists = favorites.find(
    (fav) => fav.id === song.id
  );

  if (exists) {
    setFavorites(
      favorites.filter(
        (fav) => fav.id !== song.id
      )
    );
  } else {
    setFavorites([
      ...favorites,
      song
    ]);
  }
};
const exportSongs = () => {
  const data = JSON.stringify(songs, null, 2);

  const blob = new Blob([data], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "Christian_Worship_Hub_Songs.json";

  link.click();

  URL.revokeObjectURL(url);
};

const importSongs=(event)=>{
  const file =event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload=(e)=>{
    try{
      const importedSongs=JSON.parse(
        e.target.result
      );
      setSongs(importedSongs);
      alert("Songs imported successfully!");
    } catch{
      alert("Invalid JSON file.");
    }
    };
    reader.readAsText(file);
  } ;
  <input
  type="file"
  accept=".json"
  onChange={importSongs}
/>


  return (
    <div >
    <BrowserRouter>

      <Navbar exportSongs={exportSongs} />

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

        <Route path="/edit/:id" element={<EditSong songs={songs} setSongs={setSongs} />} 
        /> 
      
      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;