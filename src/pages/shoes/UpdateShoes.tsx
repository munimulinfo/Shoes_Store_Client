import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { FaRegEdit, FaSkating } from "react-icons/fa";
import { useUpdateShoesMutation } from "../../redux/featuers/shoes/shoesApi";

type TUpdateProps = {
  name: string;
  quantity: string;
  price: number;
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

const UpdateShoes = ({
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
  _id,
}: TUpdateProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updateShoes, { isLoading }] = useUpdateShoesMutation();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=1e026c5eba4e0751bd71f1436ae6da99`;
  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  const { register, handleSubmit } = useForm();

  const handleFormData = async (data: any) => {
    try {
      setLoading(true);
      let imgUrl: string | undefined = undefined;

      if (data.image?.length > 0) {
        const imgdata = new FormData();
        imgdata.append("image", data?.image[0]);

        const response = await fetch(img_hosting_url, {
          method: "POST",
          body: imgdata,
        });

        const uploadImage = await response.json();
        if (uploadImage.success) {
          imgUrl = uploadImage?.data?.display_url;
        }
      }

      const shoeInfo = {
        id: _id,
        shoe: {
          name: data?.name || name,
          image: imgUrl || image,
          quantity: parseInt(data?.quantity) || quantity,
          price: parseInt(data?.price),
          releaseDate: data?.releaseDate || releaseDate,
          brand: data?.brand || brand,
          model: data?.model || model,
          style: data?.style || style,
          size: parseInt(data?.size) || size,
          color: data?.color || color,
          material: data?.material || material,
        },
      };
      const result = await updateShoes(shoeInfo).unwrap();
      toast.success(`${result?.message}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-fuchsia-400 rounded-full text-[15px] uppercase"
      >
        <FaRegEdit className="text-4xl p-2 rounded-full text-white" />
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom py-5 sm:modal-middle md:w-2/4 mx-auto"
          open
        >
          <form
            onSubmit={handleSubmit(handleFormData)}
            className="border-[3px] p-8  h-full overflow-y-scroll relative w-full border-gray-300 rounded-lg bg-gray-100  auth-shadow"
            action=""
          >
            <h1 className="text-lg text-center mb-2 font-serif text-emerald-500 uppercase font-bold ">
              Update Shoe
            </h1>
            {/* //first row  */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Shoe name</span>
                </label>
                <input
                  type="text"
                  defaultValue={name}
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
                  defaultValue={quantity}
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
                  defaultValue={price}
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
                  defaultValue={releaseDate}
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
                  defaultValue={brand}
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
                  defaultValue={model}
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
                  defaultValue={color}
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
                  defaultValue={material}
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
                  defaultValue={size}
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
                  defaultValue={style}
                  {...register("style")}
                  placeholder="Enter Shoe Style"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            {/* // 7th row  */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-color">shoe image</span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input "
              />
            </div>

            {/* // submit button  */}
            <div className="form-control w-full mt-4">
              <button
                type="submit"
                className="btn bg-emerald-500 text-white  font-serif hover:bg-emerald-500 border-0"
              >
                {loading || isLoading ? (
                  <FaSkating className="animate-bounce" />
                ) : (
                  "update Shoe"
                )}
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

export default UpdateShoes;
