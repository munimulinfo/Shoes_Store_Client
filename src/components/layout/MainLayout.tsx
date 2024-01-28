import { FcAbout } from "react-icons/fc";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
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
        <ul className=" pt-20 px-4 flex flex-col w-56 shodow shadow-lg gap-2 side-gradient h-screen">
          <li className="button-gradient py-2 px-4 text-white rounded-lg hover:button-gradient">
            <Link to={"/"}>Manage Shoes</Link>
          </li>
          <li className="button-gradient py-2 px-4 text-white rounded-lg">
            <Link to={"/oredrs"}>Manage Orders</Link>
          </li>
          <li className=" flex items-center gap-2 py-2 px-4 mt-8 bg-red-700  text-white rounded-lg">
            <FcAbout></FcAbout> logOut
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainLayout;
