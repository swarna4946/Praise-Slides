import React, { useState } from "react";
import SongCard from "../components/SongCard";

function Songlist({
  songs,
  deleteSong,
  addFavorite,
  favorites,
}) {
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
    <div className="songs-container">

      <div className="toolbar">
        <input
          className="search-box"
          type="text"
          placeholder="Search Song..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="filter-select"
          value={languageFilter}
          onChange={(e) =>
            setLanguageFilter(e.target.value)
          }
        >
          <option value="">All Languages</option>
          <option value="Telugu">Telugu</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>

      {filteredSongs.length === 0 ? (
  <div className="empty-state">
    <h2>🔍 No songs found</h2>
    <p>Try another song title.</p>
  </div>
) : (
  filteredSongs.map((song) => (
    <SongCard
      key={song.id}
      song={song}
      deleteSong={deleteSong}
      addFavorite={addFavorite}
      favorites={favorites}
    />
  ))
)}

    </div>
  );
}

export default Songlist;