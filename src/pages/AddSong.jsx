import React, { useState } from "react";

function AddSong({ addSong }) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [lyrics, setLyrics] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title.trim() === "" ||
      language === "" ||
      category === "" ||
      lyrics.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    addSong({
      title,
      language,
      category,
      lyrics
    });

    setTitle("");
    setLanguage("");
    setCategory("");
    setLyrics("");
  };

  return (
    <div className="add-song-container">
      <h1>🎵Add New Song</h1>

      <form onSubmit={handleSubmit}>
      <label>Song Title</label>
        <input
          
          type="text"
          placeholder=" e.g. Amazing Grace"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="form-row">
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">
            Select Language
          </option>

          <option value="Telugu">
            Telugu
          </option>

          <option value="English">
            English
          </option>

          <option value="Tamil">
            Tamil
          </option>

          <option value="Hindi">
            Hindi
          </option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">
            Select Category
          </option>

          <option value="Worship">
            Worship
          </option>

          <option value="Praise">
            Praise
          </option>

          <option value="Christmas">
            Christmas
          </option>

          <option value="Communion">
            Communion
          </option>

          <option value="Offering">
            Offering
          </option>

          <option value="Youth">
            Youth
          </option>
        </select>
        </div>

        <label>Song Lyrics</label>

<textarea
  rows="10"
  placeholder="Type the song lyrics here..."
  value={lyrics}
  onChange={(e) => setLyrics(e.target.value)}
/>

        <button
          type="submit"
          className="add-song-btn"
        >
          ➕Add Song
        </button>

      </form>
    </div>
  );
}

export default AddSong;