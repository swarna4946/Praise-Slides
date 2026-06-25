import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Navbar({exportSongs,importSongs}) {
   const location = useLocation();

  if(location.pathname.includes("/presentation")){
    return null;
  }
  return (
    <nav>
      <span className="logo">✝  Praise Slides</span>

      <Link to="/">Home</Link>
      <Link to="/songs">Songs</Link>
      <Link to="/add-song">Add Song</Link>
      <Link to="/favorites">Favorites</Link>
      <button className="export-btn" onClick={exportSongs}>
  📤 Export </button>
  <label className="import-btn">
  📥 Import

  <input
    type="file"
    accept=".json"
    onChange={importSongs}
    hidden
  />
</label>
    </nav>
  );
}

export default Navbar;