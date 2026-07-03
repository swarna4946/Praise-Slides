import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditSong({ songs, setSongs,getSongs,updateSongInDB }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const song = songs.find(
    (song) => String(song.id) === id
  );

  const [title, setTitle] = useState(song.title);
  const [language, setLanguage] = useState(song.language);
  const [category, setCategory] = useState(song.category);
  const [lyrics, setLyrics] = useState(song.lyrics);

  const handleSubmit = async (e) => {
    e.preventDefault();

 await updateSongInDB(song.id, {
  title,
  language,
  category,
  lyrics,
});

const data = await getSongs();

setSongs(data);



navigate("/songs");
  };

  return (
  <div className="add-song-container">

    <h1>✏️ Edit Song</h1>

    <p className="add-song-subtitle">
      Update your worship song details.
    </p>

    <form onSubmit={handleSubmit}>

      <label>Song Title</label>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="form-row">

        <div>
          <label>Language</label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>Telugu</option>
            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>
          </select>
        </div>

        <div>
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Worship</option>
            <option>Praise</option>
            <option>Christmas</option>
            <option>Communion</option>
            <option>Offering</option>
            <option>Youth</option>
          </select>
        </div>

      </div>

      <label>Song Lyrics</label>

      <textarea
        rows="12"
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
      />

      <button
        className="add-song-btn"
        type="submit"
      >
        💾 Save Changes
      </button>

    </form>

  </div>
);
}

export default EditSong;