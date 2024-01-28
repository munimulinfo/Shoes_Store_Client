import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
type PropsSearch = {
  setFilter: Dispatch<SetStateAction<object>>;
};
const SearchModal = ({ setFilter }: PropsSearch) => {
  const [isOpen, setIsOpen] = useState(false);

  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  const { register, handleSubmit, reset } = useForm();

  const handleFormData = (data: any) => {
    const isValidNumber = (value: any) =>
      !isNaN(value) && typeof value === "number";
    const shoeInfo = {
      quantity: isValidNumber(data?.quantity)
        ? parseInt(data?.quantity)
        : undefined,
      price: isValidNumber(data?.price) ? parseInt(data?.price) : undefined,
      releaseDate: data?.releaseDate,
      brand: data?.brand,
      model: data?.model,
      style: data?.style,
      size: isValidNumber(data?.size) ? parseInt(data?.size) : undefined,
      color: data?.color,
      material: data?.material,
    };
    reset();
    const filteredShoeInfo = Object.fromEntries(
      Object.entries(shoeInfo).filter(([_, value]) => value !== undefined)
    );
    setFilter(filteredShoeInfo);
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="btn px-8 text-[15px] font-serif button-gradient text-white rounded-full uppercase"
      >
        Filter Shoes
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom py-5 sm:modal-middle md:w-1/2 mx-auto"
          open
        >
          <form
            onSubmit={handleSubmit(handleFormData)}
            className="border-[3px] p-8 h-full overflow-y-scroll relative w-full border-gray-300 rounded-lg bg-gray-100  auth-shadow"
            action=""
          >
            <h1 className="text-lg text-center mb-2 font-serif text-emerald-500 uppercase font-bold ">
              Filter Shoes
            </h1>
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
                  className="input input-bordered"
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
                  className="input input-bordered"
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
                  type="number"
                  {...register("price")}
                  placeholder="Enter price"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">releaseDate</span>
                </label>
                <input
                  type="date"
                  {...register("releaseDate")}
                  className="input input-bordered"
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
                  className="input input-bordered"
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
                  className="input input-bordered"
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
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">material</span>
                </label>
                <select
                  {...register("meterial")}
                  className="select select-bordered w-full "
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
                  className="input input-bordered"
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
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* // submit button  */}
            <div className="form-control w-full mt-4">
              <button
                type="submit"
                className="btn bg-emerald-500 text-white  font-serif hover:bg-emerald-500 border-0"
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
        </dialog>
      )}
    </div>
  );
};

export default SearchModal;
