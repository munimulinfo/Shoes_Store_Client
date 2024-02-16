import { useState } from "react";
import { TbListDetails } from "react-icons/tb";

type TshoePolish = {
  name: string;
  userId: string;
  email: string;
  orderNo: string;
  phoneNumber: string;
  shoeImage: string;
  address: string;
  polishType: string;
  shineLevel: string;
  specialInstructions: string;
  canceelMessage: string;
};

const ShoePolishOrderDetails = ({
  name,
  email,
  orderNo,
  phoneNumber,
  shoeImage,
  address,
  polishType,
  shineLevel,
  specialInstructions,
  canceelMessage,
}: TshoePolish) => {
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
          <div className="modal-box gradient-color w-full  md:w-[400px]">
            {/* //content div  */}
            <div className="text-orange-500">
              <div className="flex justify-center">
                <img
                  className="h-[150px] border-2 border-cyan-600 w-[150px] rounded-full"
                  src={shoeImage}
                  alt="pollishImage"
                />
              </div>
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
                {email}
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
                <span className="shoePolishTag">Ploish Type : </span>
                {polishType}
              </h3>
              <h3>
                <span className="shoePolishTag">Shine Level : </span>
                {shineLevel}
              </h3>
              <h3>
                <span className="shoePolishTag">Instructions : </span>
                {specialInstructions}
              </h3>
              {canceelMessage && (
                <h3>
                  <span className="text-rose-500 font-bold">
                    Canceel Message :{" "}
                  </span>
                  {canceelMessage}
                </h3>
              )}
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

export default ShoePolishOrderDetails;
