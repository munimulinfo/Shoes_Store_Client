import { FiLogOut } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logOutUser } from "../../redux/featuers/auth/authSlice";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/login", { replace: true });
  };

  return (
    <div className="drawer lg:drawer-open side-bar">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary btn-xs drawer-button lg:hidden"
        >
          nissan
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className=" px-4 flex flex-col w-56 shodow shadow-lg gap-2 side-gradient h-screen">
          <h1 className="text-white text-center font-bold text-2xl pt-6 pb-10">
            SHOES-STORE
          </h1>
          <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg hover:button-gradient">
            <Link to={"/"}>Manage Shoes</Link>
          </li>
          <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
            <Link to={"/sels"}>Manage Sels</Link>
          </li>
          <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
            <Link to={"/sels-history"}>Sells History</Link>
          </li>
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
