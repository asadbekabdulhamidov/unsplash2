//react router dom
import { Outlet } from "react-router-dom";

//components
import { Navbar, Footer } from "../components";

function MainLayouts() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayouts;
