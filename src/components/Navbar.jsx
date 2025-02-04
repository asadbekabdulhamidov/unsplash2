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

//firebase
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

//toast
import { toast } from "react-toastify";

const themeFromLocaleStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

function Navbar() {
  const { likedImages, downloadImages, user, dispatch } = useGlobalContext();

  const [theme, setTheme] = useState(themeFromLocaleStorage());
  const toggleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success(`See You Soon ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <header className="bg-base-200">
      <nav className="align-elements navbar">
        <div className="navbar-start">
          <Link to="/" className="hidden md:flex">
            <FcStackOfPhotos className="h-10 w-10" />
          </Link>

          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="m-1">
              <FcStackOfPhotos className="h-10 w-10" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal rounded-box bg-base-200">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end flex gap-6">
          <Link to="/downLoadImages">
            <div className="indicator">
              <span className="badge indicator-item badge-secondary badge-sm">
                {downloadImages.length}
              </span>
              <FaDownload className="h-6 w-6" />
            </div>
          </Link>

          <Link to="/likedImages">
            <div className="indicator">
              <span className="badge indicator-item badge-secondary badge-sm">
                {likedImages.length}
              </span>
              <FaHeart className="h-6 w-6 text-red-500" />
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

          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.reloadUserInfo.photoUrl}
                    alt={user.displayName + "avatar"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={signOutUser}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
