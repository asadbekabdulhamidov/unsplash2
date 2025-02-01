//react icons
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart, FaSun, FaMoon, FaDownload } from "react-icons/fa";

//react router dom
import { Link } from "react-router-dom";

//components
import NavLinks from "./NavLinks";
import { useEffect, useState } from "react";

//useGlobalContext
import { useGlobalContext } from "../hooks/useGlobalContext";

const themeFromLocaleStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

function Navbar() {
  const { likedImages, downloadImages } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocaleStorage());
  const toggleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <header className="bg-base-200">
      <nav className="navbar align-elements">
        <div className="navbar-start">
          <Link to="/" className="hidden md:flex">
            <FcStackOfPhotos className="w-10 h-10" />
          </Link>

          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className=" m-1">
              <FcStackOfPhotos className="w-10 h-10" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end flex gap-6">
          <Link to="/downLoadImages">
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">
                {downloadImages.length}
              </span>
              <FaDownload className="w-6 h-6" />
            </div>
          </Link>

          <Link to="/likedImages">
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">
                {likedImages.length}
              </span>
              <FaHeart className="w-6 h-6 text-red-500" />
            </div>
          </Link>

          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onClick={toggleTheme} />

            {/* sun icon */}
            <FaSun className="swap-on h-6 w-6 fill-current" />

            {/* moon icon */}
            <FaMoon className="swap-off h-6 w-6 fill-current" />
          </label>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
