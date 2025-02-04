//react router dom
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

//pages
import {
  Home,
  About,
  Contact,
  LikedImages,
  DownLoadImages,
  ImageInfo,
  Login,
  Register,
} from "./pages";

//layouts
import MainLayouts from "./layouts/MainLayouts";

//actions
import { action as HomeAction } from "./pages/Home";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";

//global context
import { useGlobalContext } from "./hooks/useGlobalContext";

//components
import { ProtectedRoutes } from "./components";
//react
import { useEffect } from "react";
//firebase
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

//toast
import { toast } from "react-toastify";

function App() {
  const { user, dispatch, authReady } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayouts />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/likedImages",
          element: <LikedImages />,
        },
        {
          path: "/downLoadImages",
          element: <DownLoadImages />,
        },
        {
          path: "/imageinfo/:id",
          element: <ImageInfo />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOGIN", payload: user });

      dispatch({ type: "AUTH_READY" });
    });
  }, []);
  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
