import { Link } from "react-router-dom";

function Home({ songs = [] }) {

  const featuredSongs = songs.slice(0, 3);
   const totalLanguages =
  new Set(
    songs.map(
      (song) => song.language
    )
  ).size;

  return (
    <>
      <div className="hero">
        <h1>✝ Christian Worship Hub</h1>

        <p>
          Telugu • Tamil • English Worship Songs
        </p>

        <Link to="/songs">
          <button className="hero-btn">
            Explore Songs
          </button>
        </Link>
      </div>

      <section className="featured">
        <h2>🎵 Featured Songs</h2>

        <div className="featured-container">
          {featuredSongs.map((song) => (
            <div
              className="featured-card"
              key={song.id}
            >
              <h3>{song.title}</h3>

              <p>
                {song.language} {song.category}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="stats">
  <div>
    <h2>{songs.length}</h2>
    <p>Total Songs</p>
  </div>

 

  <div>
    <h2>{totalLanguages}</h2>
    <p>Languages</p>
  </div>

  <div>
    <h2>24/7</h2>
    <p>📄 Lyrics & Slides</p>
  </div>
</div>
          <section className="mission">
  <h2>Our Mission</h2>

  <p>
    To provide Telugu, Tamil, and English Christian
    worship songs for churches, worship teams,
    and believers around the world.
  </p>
</section>

      <footer className="footer">
  <h3>✝  Praise Slides</h3>

  <p>
    "Sing unto the Lord a new song; sing unto the Lord, all the earth."
  </p>

  <h4>Psalm 96:1</h4>

  <p>© 2026 Praise Slides</p>
</footer>
    </>
    
  );
}

export default Home;