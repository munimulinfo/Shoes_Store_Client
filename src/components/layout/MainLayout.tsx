import { FiLogOut } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logOutUser } from "../../redux/featuers/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { buyerLink, sellerLink } from "./SidebarItems";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/login", { replace: true });
  };

  return (
    <div className="drawer lg:drawer-open side-bar relative">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className=" flex justify-start items-center gap-5 absolute top-3 left-3 drawer-button lg:hidden"
        >
          <FaList className="text-4xl bg-black  text-white p-2 rounded-sm"></FaList>
          <h1 className="text-2xl text-black font-serif font-bold">
            SHOES-STORE
          </h1>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className=" px-4 flex flex-col md:w-56 w-48 shodow shadow-lg gap-2 side-gradient h-screen ">
          <h1 className="text-white text-center font-bold text-2xl pt-6 pb-10">
            SHOES-STORE
          </h1>
          {sellerLink}
          {buyerLink}
          <li
            onClick={handleLogout}
            className=" flex uppercase cursor-pointer items-center gap-2 py-2 px-4 mt-8 bg-red-700  text-white rounded-lg"
          >
            <FiLogOut></FiLogOut> logOut
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainLayout;
