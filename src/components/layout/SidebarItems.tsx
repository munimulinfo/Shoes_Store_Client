import { Link } from "react-router-dom";

export const sellerLink = (
  <>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg hover:button-gradient">
      <Link to={"/"}>Manage Shoes</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/sels"}>Manage Sels</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/sels-history"}>Sells History</Link>
    </li>
  </>
);

export const buyerLink = (
  <>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg hover:button-gradient">
      <Link to={"/view-allShoes"}>View AllShoes</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/verify-shoes"}>Verify Shoes</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/shoePolish-service"}>Shoe Service</Link>
    </li>
    <li className="button-gradient py-2 uppercase px-4 text-white rounded-lg">
      <Link to={"/customized-shoe"}>Customized Shoe</Link>
    </li>
  </>
);
