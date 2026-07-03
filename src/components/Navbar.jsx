import { Link,useLocation } from "react-router-dom";
import { useState } from "react";


function Navbar({exportSongs,
                importSongs,
                darkMode,
                setDarkMode

}) {

   const location = useLocation();
   const [menuOpen,setMenuOpen] = useState(false);

  

  if(location.pathname.includes("/presentation")){
    return null;
  }
  return (
    <nav>
      <span className="logo">✝  Praise Slides</span>

       <button
    className="menu-btn"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? "✕" : "☰"}
  </button>

  <div className={menuOpen ? "nav-links active" : "nav-links"}>

  <Link to="/">Home</Link>
  <Link to="/songs">Songs</Link>
  <Link to="/add-song">Add Song</Link>
  <Link to="/favorites">Favorites</Link>

  <button className="export-btn" onClick={exportSongs}>
    📤 Export
  </button>

  <label className="import-btn">
    📥 Import
    <input
      type="file"
      accept=".json"
      onChange={importSongs}
      hidden
    />
  </label>

  <button
    className="theme-btn"
    onClick={() => setDarkMode(!darkMode)}
  >
    {darkMode ? "☀️" : "🌙"}
  </button>

</div>
    </nav>
  );
}

export default Navbar;