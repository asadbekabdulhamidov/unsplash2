//react router dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import {
  Home,
  About,
  Contact,
  LikedImages,
  DownLoadImages,
  ImageInfo,
} from "./pages";

//layouts
import MainLayouts from "./layouts/MainLayouts";

//actions
import { action as HomeAction } from "./pages/Home";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts />,
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
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
