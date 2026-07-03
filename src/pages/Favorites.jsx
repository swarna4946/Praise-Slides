function Favorites({ favorites }) {
  return (
    <div className="songs-container">

      <h1 className="page-title">
        ⭐ Favorite Songs
      </h1>
      <p>Total Favorites: {favorites.length}</p>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
  <h2>💛 No Favorite Songs Yet</h2>
  <p>
    Tap the ⭐ button on any song to add it here.
  </p>
</div>
      ) : (
        favorites.map((song) => (
          <div
            key={song.id}
            className="song-card"
          >
            <h3 className="favorite-title">
              {song.title}
            </h3>

            <p className="song-meta">
              {song.language} • {song.category}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default Favorites;