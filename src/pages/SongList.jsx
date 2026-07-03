import React, { useState } from "react";
import { Link } from "react-router-dom";

function Songlist({ songs ,deleteSong, addFavorite,favorites}) {
  console.log("addFavorite =", addFavorite);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const filteredSongs = songs
  .filter((song) =>
    song.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((song) =>
    languageFilter === ""
      ? true
      : song.language === languageFilter
  )
  .sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className='songs-container'>
      

      <div className="toolbar">
      <input className="search-box"
        type="text"
        placeholder="Search Song..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>
        
      <select className='filter-select'
        value={languageFilter}
        onChange={(e) => setLanguageFilter(e.target.value)}
        
      >
        <option value="">All Languages</option>
        <option value="Telugu">Telugu</option>
        <option value="English">English</option>
        <option value="Tamil">Tamil</option>
        <option value="Hindi">Hindi</option>
      </select>
      </div>
      {filteredSongs.map((song) => (
  <div className="song-card" key={song.id}>

    
<div className="song-header">
      <h3>
        <Link to={`/song/${song.id}`}>
          {song.title}
        </Link>
      </h3>
     

      <div className="actions">

        <Link to={`/presentation/${song.id}`}>
          <button className="present-btn">
             Present
          </button>
        </Link>

        <button className="favorite-btn" onClick={() => addFavorite(song)}>
  {favorites.some(
    (fav) => fav.songId === song.id
  )
    ? "💔"
    : "⭐"}
</button>

        <Link to={`/edit/${song.id}`}>
          <button className="edit-btn">
            ✏️ Edit
          </button>
        </Link>

        <button
          className="delete-btn"
          onClick={() => {
            if (window.confirm("Delete this song?")) {
              deleteSong(song.id);
            }
          }}
        >
          🗑 Delete
        </button>

      </div>
      </div>


    <p className="song-meta">
    {song.language} • {song.category}</p>

  
  </div>
))}
</div>);

}
export default Songlist;