import React from "react";
import { Link } from "react-router-dom";
import { startPresentation } from "../services/presentationService";

function SongCard({
  song,
  deleteSong,
  addFavorite,
  favorites,
}) {
  return (
    <div className="song-card">

      <div className="song-header">

        <h3>
          <Link to={`/song/${song.id}`}>
            {song.title}
          </Link>
        </h3>

        <div className="actions">

          <button
  className="present-btn"
  onClick={async () => {
    await startPresentation(song);

    window.open(
      `/presentation/${song.id}`,
      "_blank"
    );
  }}
>
  ▶ Present
</button>

          <button
            className="favorite-btn"
            onClick={() => addFavorite(song)}
          >
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
              if (
                window.confirm(
                  "Delete this song?"
                )
              ) {
                deleteSong(song.id);
              }
            }}
          >
            🗑 Delete
          </button>

        </div>

      </div>

      <p className="song-meta">
        {song.language} • {song.category}
      </p>

    </div>
  );
}

export default SongCard;