import { useState } from "react";
import { TbListDetails } from "react-icons/tb";

const ShoePolishOrderDetails = () => {
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
          <div className="modal-box">
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
