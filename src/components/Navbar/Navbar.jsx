import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <header>
      <h1>Recipe Finder</h1>
      <div>
        <Link to="/">
          <button>Categories</button>
        </Link>
        <Link to="/favorites">
          <button>Favorites</button>
        </Link>

        <div>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <button
            onClick={() => {
              navigate(`/search?query=${search}`);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
