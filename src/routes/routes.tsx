import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectRoute from "./protectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <App></App>
      </ProtectRoute>
    ),
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
