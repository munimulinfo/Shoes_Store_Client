import { Link } from "react-router-dom";

export const sellerLink = (
  <>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg hover:button-gradient">
      <Link to={"/seller/dashboard"}>DashBoard</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg hover:button-gradient">
      <Link to={"/seller/manage-allShoes"}>Manage Shoes</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/seller/sels"}>Manage Sels</Link>
    </li>

    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/seller/sels-history"}>Sells History</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg hover:button-gradient">
      <Link to={"/seller/alShoeCustomized-request"}>All-CShoe-Request</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg hover:button-gradient">
      <Link to={"/seller/all-shoePolish"}>Polish Request</Link>
    </li>
  </>
);

export const buyerLink = (
  <>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg hover:button-gradient">
      <Link to={"/buyer/dashboard"}>DashBoard</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/buyer/verify-shoes"}>Verify Shoes</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/buyer/shoePolish-service"}>Shoe Polish</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/buyer/shoeCustomized-service"}>Customized Shoe</Link>
    </li>
  </>
);
