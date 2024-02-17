import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllShoes from "../pages/seller/shoes/AllShoes";
import ProtectRoute from "./ProtectRoute";
import Allsels from "../pages/seller/allsels/Allsels";
import SellsHistory from "../pages/seller/allsels/SellsHistory";
import ErrorPage from "../pages/ErrorPage";
import VerifyShoes from "../pages/buyer/service/shoePolish/VerifyShoes";
import CutomizedShoe from "../pages/buyer/service/shoePolish/CutomizedShoe";
import ShoePolisService from "../pages/buyer/service/shoePolish/ShoePolisService";
import AllShoePolishRequest from "../pages/seller/shoePolish/AllShoePolishRequest";
import ShoeCustomizedService from "../pages/buyer/service/shoeCustomized/ShoeCustomizedService";
import AllShoeCustomizedRequest from "../pages/seller/shoeCustomized/AllShoeCustomizedRequest";
import SellerDashBoard from "../pages/seller/SellerDashBoard";
import BuyerDashBoard from "../pages/buyer/BuyerDashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: (
      <ProtectRoute role="undefined">
        <App></App>
      </ProtectRoute>
    ),
  },
  {
    path: "/seller",
    element: (
      <ProtectRoute role="seller">
        <App></App>
      </ProtectRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectRoute role="seller">
            <SellerDashBoard></SellerDashBoard>
          </ProtectRoute>
        ),
      },
      {
        path: "manage-allShoes",
        element: (
          <ProtectRoute role="seller">
            <AllShoes></AllShoes>
          </ProtectRoute>
        ),
      },
      {
        path: "sels",
        element: (
          <ProtectRoute role="seller">
            <Allsels></Allsels>
          </ProtectRoute>
        ),
      },
      {
        path: "sels-history",
        element: (
          <ProtectRoute role="seller">
            <SellsHistory></SellsHistory>
          </ProtectRoute>
        ),
      },
      {
        path: "alShoeCustomized-request",
        element: (
          <ProtectRoute role="seller">
            <AllShoeCustomizedRequest></AllShoeCustomizedRequest>
          </ProtectRoute>
        ),
      },
      {
        path: "all-shoePolish",
        element: (
          <ProtectRoute role="seller">
            <AllShoePolishRequest></AllShoePolishRequest>
          </ProtectRoute>
        ),
      },
    ],
  },
  {
    path: "/buyer",
    element: (
      <ProtectRoute role="buyer">
        <App></App>
      </ProtectRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectRoute role="buyer">
            <BuyerDashBoard></BuyerDashBoard>
          </ProtectRoute>
        ),
      },
      {
        path: "verify-shoes",
        element: (
          <ProtectRoute role="buyer">
            <VerifyShoes></VerifyShoes>
          </ProtectRoute>
        ),
      },

      {
        path: "customized-shoe",
        element: (
          <ProtectRoute role="buyer">
            <CutomizedShoe></CutomizedShoe>
          </ProtectRoute>
        ),
      },
      {
        path: "shoePolish-service",
        element: (
          <ProtectRoute role="buyer">
            <ShoePolisService></ShoePolisService>
          </ProtectRoute>
        ),
      },
      {
        path: "shoeCustomized-service",
        element: (
          <ProtectRoute role="buyer">
            <ShoeCustomizedService></ShoeCustomizedService>
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
