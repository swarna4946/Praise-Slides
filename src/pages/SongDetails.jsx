import React from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

function Songdetails({songs}) {
  const { id } = useParams();

  const song = songs.find(
    (song) => song.id === id
  );

  if (!song) {
    return <h2>Song Not Found</h2>;
  }

  return (
    <div>
      <h1>{song.title}</h1>

      <h3>{song.language}</h3>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "20px",
          lineHeight: "2",
        }}
      >
        {song.lyrics}
        <Link to={`/presentation/${song.id}`}>
              <button> Presentation Mode</button>
        </Link>
      </pre>
    </div>
  );
}

export default Songdetails;