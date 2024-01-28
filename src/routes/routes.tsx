import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllShoes from "../pages/shoes/AllShoes";
import ProtectRoute from "./ProtectRoute";
import Allsels from "../pages/allsels/Allsels";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <App></App>
      </ProtectRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectRoute>
            <AllShoes></AllShoes>
          </ProtectRoute>
        ),
      },
      {
        path: "sels",
        element: (
          <ProtectRoute>
            <Allsels></Allsels>
          </ProtectRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
