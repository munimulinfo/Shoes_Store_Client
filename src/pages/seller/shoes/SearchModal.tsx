import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
type TPropsSearch = {
  setFilter: Dispatch<SetStateAction<object>>;
};
const SearchModal = ({ setFilter }: TPropsSearch) => {
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState<string>("");
  console.log(price);
  //Modl Function
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  //Search Form Handle
  const { register, handleSubmit, reset } = useForm();
  const handleFormData = (data: any) => {
    const shoeInfo = {
      name: data?.name,
      quantity: Number(data?.quantity),
      price: Number(data.price),
      releaseDate: data?.releaseDate,
      brand: data?.brand,
      model: data?.model,
      style: data?.style,
      size: Number(data.price),
      color: data?.color,
      material: data?.material,
    };
    console.log(shoeInfo, "inside search modal");
    reset();
    setFilter(shoeInfo);
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="btn md:px-8 px-2 md:text-[15px] text-[10px] font-serif button-gradient text-white rounded-full uppercase"
      >
        Filter Shoes
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog id="my_modal_5" className="modal" open>
          <div className="modal-box">
            <form
              onSubmit={handleSubmit(handleFormData)}
              className=""
              action=""
            >
              {/* //first row  */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Shoe name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter Shoe Name"
                    className="input input-bordered input-error"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Shoe quantity</span>
                  </label>
                  <input
                    type="number"
                    {...register("quantity")}
                    placeholder="Enter shoe quantity"
                    className="input input-bordered input-error"
                  />
                </div>
              </div>

              {/* // secoond Row  */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Shoe price</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    {...register("price")}
                    max={10000}
                    onChange={handleChange}
                    className="range  range-error range-md"
                  />
                  <p>{price}</p>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">releaseDate</span>
                  </label>
                  <input
                    type="date"
                    {...register("releaseDate")}
                    className="input input-bordered input-error"
                  />
                </div>
              </div>
              {/* third row  */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe brand</span>
                  </label>
                  <input
                    type="text"
                    {...register("brand")}
                    placeholder="Enter brand"
                    className="input input-bordered input-error"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe model</span>
                  </label>
                  <input
                    type="text"
                    {...register("model")}
                    placeholder="Enter model"
                    className="input input-bordered input-error"
                  />
                </div>
              </div>
              {/* //Fifth row  */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe color</span>
                  </label>
                  <input
                    type="text"
                    {...register("color")}
                    placeholder="Enter color"
                    className="input input-bordered input-error"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">material</span>
                  </label>
                  <select
                    {...register("meterial")}
                    className="select select-bordered select-error w-full "
                  >
                    <option disabled value="">
                      select meterial
                    </option>
                    <option value="leather">leather</option>
                    <option value="fabric">fabric</option>
                  </select>
                </div>
              </div>
              {/* sisth row */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe size</span>
                  </label>
                  <input
                    type="number"
                    {...register("size")}
                    placeholder="Enter shoe size"
                    className="input input-bordered input-error"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe style</span>
                  </label>
                  <input
                    type="text"
                    {...register("style")}
                    placeholder="Enter Shoe Style"
                    className="input input-bordered input-error w-full"
                  />
                </div>
              </div>

              {/* // submit button  */}
              <div className="form-control w-full mt-4">
                <button
                  type="submit"
                  className="btn text-white  font-serif button-gradient"
                >
                  Filter
                </button>
              </div>
              {/* //model close button  */}
              {/* //modal close butto  */}
              <div className="modal-action">
                <button
                  className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-2 top-2 bg-red-600"
                  onClick={closeModal}
                >
                  &#10005;
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default SearchModal;
