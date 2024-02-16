import { useState } from "react";
import { TbListDetails } from "react-icons/tb";

type TUpdateProps = {
  name: string;
  quantity: string;
  price: number;
  productId: string;
  releaseDate: string;
  brand: string;
  model: string;
  style: string;
  size: number;
  color: string;
  material: string;
  image: string;
  _id: string;
};

const ShoesDetails = ({
  name,
  quantity,
  price,
  releaseDate,
  brand,
  model,
  style,
  size,
  color,
  material,
  image,
  productId,
}: TUpdateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  const originalDate = new Date(releaseDate);

  const formattedDate = originalDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div>
      <button onClick={openModal} className="bg-fuchsia-400 rounded-full">
        <TbListDetails className="text-4xl p-2 text-white"></TbListDetails>
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom py-5 sm:modal-middle md:w-1/2 mx-auto"
          open
        >
          <div>
            <div className="card relative bg-base-100 shadow-xl">
              <figure>
                <img
                  className="w-full max-w-[500px] h-56"
                  src={image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Shoe Name: {name}
                  <div className="badge badge-secondary uppercase">
                    {material}
                  </div>
                </h2>
                <h2 className="card-title">ProductId: {productId}</h2>
                <div className="flex lg:flex-row flex-col">
                  <p>
                    <span className="p-text">quantity:</span>
                    {quantity}
                  </p>
                  <p>
                    <span className="p-text">ReleaseDate: </span>
                    {formattedDate}
                  </p>
                </div>

                <div className="flex lg:flex-row flex-col">
                  <p>
                    <span className="p-text">Size: </span>
                    {size}
                  </p>
                  <p>
                    <span className="p-text">Price:</span>${price}
                  </p>
                </div>
                <div className="flex lg:flex-row flex-col">
                  <p>
                    <span className="p-text">Brand: </span>
                    {brand}
                  </p>
                  <p>
                    <span className="p-text">Model: </span>
                    {model}
                  </p>
                </div>
                <div className="flex lg:flex-row flex-col">
                  <p>
                    <span className="p-text">Style: </span>
                    {style}
                  </p>
                  <p>
                    <span className="p-text">Color: </span>
                    {color}
                  </p>
                </div>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-sm border-none btn-circle text-white absolute hover:bg-red-800 right-3 top-3 bg-red-600"
                  onClick={closeModal}
                >
                  &#10005;
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ShoesDetails;
