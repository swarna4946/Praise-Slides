import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditSong({ songs, setSongs }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const song = songs.find(
    (song) => song.id === parseInt(id)
  );

  const [title, setTitle] = useState(song.title);
  const [language, setLanguage] = useState(song.language);
  const [category, setCategory] = useState(song.category);
  const [lyrics, setLyrics] = useState(song.lyrics);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedSongs = songs.map((s) =>
      s.id === song.id
        ? {
            ...s,
            title,
            language,
            category,
            lyrics,
          }
        : s
    );

    setSongs(updatedSongs);

    navigate("/songs");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Song</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br /><br />

        <input
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
        />

        <br /><br />

        <input
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <br /><br />

        <textarea
          rows="8"
          cols="50"
          value={lyrics}
          onChange={(e) =>
            setLyrics(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditSong;