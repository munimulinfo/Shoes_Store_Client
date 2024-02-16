import moment from "moment";
import { useState } from "react";
import { TbListDetails } from "react-icons/tb";

type TCustomizedShoe = {
  name: string;
  userEmail: string;
  model: string;
  style: string;
  size: number;
  color: string;
  material: string;
  address: string;
  quantity: number;
  instructions: string;
  phoneNumber: string;
  orderDate: string;
  orderNo: string;
};

const ShoeCustomizedOrderDetails = ({
  model,
  style,
  color,
  material,
  address,
  instructions,
  quantity,
  phoneNumber,
  size,
  name,
  userEmail,
  orderDate,
  orderNo,
}: TCustomizedShoe) => {
  const [isOpen, setIsOpen] = useState(false);
  //Modl Function
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="bg-fuchsia-400 rounded-full">
        <TbListDetails className="text-4xl p-2 text-white"></TbListDetails>
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog id="my_modal_5" className="modal" open>
          <div className="modal-box gradient-color w-full">
            {/* //content div  */}
            <div className="text-orange-500 grid md:grid-cols-2 gap-2">
              <h3>
                <span className="shoePolishTag">Order No : </span>
                {orderNo}
              </h3>
              <h3>
                <span className="shoePolishTag">Name : </span>
                {name}
              </h3>
              <h3>
                <span className="shoePolishTag">Email : </span>
                {userEmail}
              </h3>
              <h3>
                <span className="shoePolishTag">Phone Number : </span>
                {phoneNumber}
              </h3>
              <h3>
                <span className="shoePolishTag">Address : </span>
                {address}
              </h3>
              <h3>
                <span className="shoePolishTag">Model : </span>
                {model}
              </h3>
              <h3>
                <span className="shoePolishTag">Style : </span>
                {style}
              </h3>
              <h3>
                <span className="shoePolishTag">Color : </span>
                {color}
              </h3>
              <h3>
                <span className="shoePolishTag">Quantity : </span>
                {quantity}
              </h3>
              <h3>
                <span className="shoePolishTag">Material : </span>
                {material}
              </h3>
              <h3>
                <span className="shoePolishTag">Size : </span>
                {size}
              </h3>
              <h3>
                <span className="shoePolishTag">OrderDate : </span>
                {moment(orderDate).format("MMM Do YY")}
              </h3>
              <h3>
                <span className="shoePolishTag">Instructions : </span>
                {instructions}
              </h3>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-2 top-2 bg-red-600"
                onClick={closeModal}
              >
                &#10005;
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ShoeCustomizedOrderDetails;
