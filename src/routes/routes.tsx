import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllShoes from "../pages/seller/shoes/AllShoes";
import ProtectRoute from "./ProtectRoute";
import Allsels from "../pages/buyer/allsels/Allsels";
import SellsHistory from "../pages/buyer/allsels/SellsHistory";
import ErrorPage from "../pages/ErrorPage";
import VerifyShoes from "../pages/buyer/service/shoePolish/VerifyShoes";
import CutomizedShoe from "../pages/buyer/service/shoePolish/CutomizedShoe";
import ShoePolisService from "../pages/buyer/service/shoePolish/ShoePolisService";
import AllShoePolishRequest from "../pages/seller/shoePolish/AllShoePolishRequest";
import ShoeCustomizedService from "../pages/buyer/service/shoeCustomized/ShoeCustomizedService";
import AllShoeCustomizedRequest from "../pages/seller/shoeCustomized/AllShoeCustomizedRequest";

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
        path: "verify-shoes",
        element: (
          <ProtectRoute>
            <VerifyShoes></VerifyShoes>
          </ProtectRoute>
        ),
      },
      {
        path: "all-shoePolish",
        element: (
          <ProtectRoute>
            <AllShoePolishRequest></AllShoePolishRequest>
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
      {
        path: "shoeCustomized-service",
        element: (
          <ProtectRoute>
            <ShoeCustomizedService></ShoeCustomizedService>
          </ProtectRoute>
        ),
      },
      {
        path: "alShoeCustomized-request",
        element: (
          <ProtectRoute>
            <AllShoeCustomizedRequest></AllShoeCustomizedRequest>
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
