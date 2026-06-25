function Favorites({ favorites }) {
  return (
    <div className="songs-container">

      <h1 className="page-title">
        ⭐ Favorite Songs
      </h1>
      <p>Total Favorites: {favorites.length}</p>

      {favorites.length === 0 ? (
        <div style={{textAlign:"center", marginTop:"80px"}}>
        <h2>No favorite songs yet ❤️</h2>
        <p>Add songs from the Songs page.</p></div>
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