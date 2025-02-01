// react router dom
import { Link } from "react-router-dom";

const navLinks = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/about",
    text: "About",
  },
  {
    path: "/contact",
    text: "Contact",
  },
];

function NavLinks() {
  return (
    <>
      {navLinks.map((link) => {
        return (
          <li key={link.text}>
            <Link to={link.path}>{link.text}</Link>
          </li>
        );
      })}
    </>
  );
}

export default NavLinks;
