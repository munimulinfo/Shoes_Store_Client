import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllShoes from "../pages/seller/shoes/AllShoes";
import ProtectRoute from "./ProtectRoute";
import Allsels from "../pages/allsels/Allsels";
import SellsHistory from "../pages/allsels/SellsHistory";
import ErrorPage from "../pages/ErrorPage";
import ViewAllShoes from "../pages/buyer/ViewAllShoes";
import VerifyShoes from "../pages/buyer/VerifyShoes";
import CutomizedShoe from "../pages/buyer/CutomizedShoe";
import ShoePolisService from "../pages/buyer/ShoePolisService";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: "sels-history",
        element: (
          <ProtectRoute>
            <SellsHistory></SellsHistory>
          </ProtectRoute>
        ),
      },
      {
        path: "view-allShoes",
        element: (
          <ProtectRoute>
            <ViewAllShoes></ViewAllShoes>
          </ProtectRoute>
        ),
      },
      {
        path: "verify-shoes",
        element: (
          <ProtectRoute>
            <VerifyShoes></VerifyShoes>
          </ProtectRoute>
        ),
      },
      {
        path: "customized-shoe",
        element: (
          <ProtectRoute>
            <CutomizedShoe></CutomizedShoe>
          </ProtectRoute>
        ),
      },
      {
        path: "shoePolish-service",
        element: (
          <ProtectRoute>
            <ShoePolisService></ShoePolisService>
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
