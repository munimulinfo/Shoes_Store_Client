import { useAddShoesMutation } from "../../../redux/featuers/shoes/shoesApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { FaPersonSkating } from "react-icons/fa6";
import { useAppSelector } from "../../../redux/hooks";

const AddShoes = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [addShoes, { isLoading }] = useAddShoesMutation();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=1e026c5eba4e0751bd71f1436ae6da99`;
  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormData = async (data: FieldValues) => {
    try {
      setLoading(true);
      const imgdata = new FormData();
      imgdata.append("image", data?.image[0]);
      const response = await fetch(img_hosting_url, {
        method: "POST",
        body: imgdata,
      });
      const uploadImage = await response.json();
      if (uploadImage?.success) {
        const imgUrl = uploadImage?.data?.display_url;
        const shoeInfo = {
          name: data?.name,
          image: imgUrl,
          productId: `mh-${Math.random().toString().substring(2, 9)}`,
          quantity: Number(data?.quantity),
          price: Number(data?.price),
          releaseDate: data?.releaseDate,
          brand: data?.brand,
          model: data?.model,
          style: data?.style,
          size: Number(data?.size),
          color: data?.color,
          material: data?.meterial,
          userEmail: user?.email,
          userId: user?.userId,
        };
        const result = await addShoes(shoeInfo).unwrap();
        reset();
        toast.success(`${result?.message}`);
      }
    } catch (error: any) {
      toast.success(error?.data?.message);
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="btn md:px-8 px-2 md:text-[15px] text-[10px] font-serif button-gradient text-white rounded-full uppercase"
      >
        Add Shoe
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog id="my_modal_5" className="modal" open>
          <div className="modal-box">
            <form onSubmit={handleSubmit(handleFormData)} action="">
              <div className="grid md:grid-cols-2 gap-5 justify-center items-center">
                {/* //first row  */}

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Shoe name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Enter Shoe Name"
                    className="input input-bordered input-error"
                  />
                  {errors.name && (
                    <span className="text-rose-500 animate-pulse">
                      please provide Shoe Name
                    </span>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Shoe quantity</span>
                  </label>
                  <input
                    type="number"
                    {...register("quantity", { required: true })}
                    placeholder="Enter shoe quantity"
                    className="input input-bordered input-error"
                  />
                  {errors.quantity && (
                    <span className="text-rose-500 animate-pulse">
                      please provide Shoe Quantity
                    </span>
                  )}
                </div>

                {/* // secoond Row  */}

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Shoe price</span>
                  </label>
                  <input
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="Enter price"
                    className="input input-bordered input-error"
                  />
                  {errors.price && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoe price
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">releaseDate</span>
                  </label>
                  <input
                    type="date"
                    {...register("releaseDate", {
                      required: true,
                    })}
                    className="input input-bordered input-error"
                  />
                  {errors.releaseDate && (
                    <span className="text-rose-500 animate-pulse">
                      please provide releaseDate
                    </span>
                  )}
                </div>

                {/* third row  */}

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe brand</span>
                  </label>
                  <input
                    type="text"
                    {...register("brand", {
                      required: true,
                    })}
                    placeholder="Enter brand"
                    className="input input-bordered input-error"
                  />
                  {errors.brand && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoe brand
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe model</span>
                  </label>
                  <input
                    type="text"
                    {...register("model", {
                      required: true,
                    })}
                    placeholder="Enter model"
                    className="input input-bordered input-error"
                  />
                  {errors.model && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoe model
                    </span>
                  )}
                </div>

                {/* //Fifth row  */}

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe color</span>
                  </label>
                  <input
                    type="text"
                    {...register("color", {
                      required: true,
                    })}
                    placeholder="Enter color"
                    className="input input-bordered input-error"
                  />
                  {errors.color && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoe color
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">material</span>
                  </label>
                  <select
                    {...register("meterial", {
                      required: true,
                    })}
                    className="select select-bordered select-error w-full "
                  >
                    <option disabled value="">
                      select meterial
                    </option>
                    <option value="leather">leather</option>
                    <option value="fabric">fabric</option>
                  </select>
                  {errors.meterial && (
                    <span className="text-rose-500 animate-pulse">
                      Please provide shoe metarial
                    </span>
                  )}
                </div>

                {/* sisth row */}

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe size</span>
                  </label>
                  <input
                    type="number"
                    {...register("size", {
                      required: true,
                    })}
                    placeholder="Enter shoe size"
                    className="input input-bordered input-error"
                  />
                  {errors.size && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoe size
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">shoe style</span>
                  </label>
                  <input
                    type="text"
                    {...register("style", {
                      required: true,
                    })}
                    placeholder="Enter Shoe Style"
                    className="input input-bordered input-error w-full"
                  />
                  {errors.style && (
                    <span className="text-rose-500 animate-pulse">
                      please upload shoe style
                    </span>
                  )}
                </div>
              </div>
              {/* // 7th row  */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">shoe image</span>
                </label>
                <input
                  type="file"
                  {...register("image", {
                    required: true,
                  })}
                  className="file-input file-input-error "
                />
                {errors.image && (
                  <span className="text-rose-500 animate-pulse">
                    please upload shoe image
                  </span>
                )}
              </div>

              {/* // submit button  */}
              <div className="form-control w-full mt-4">
                <button
                  type="submit"
                  className="btn text-white  font-serif button-gradient"
                >
                  {loading || isLoading ? (
                    <FaPersonSkating className="animate-bounce" />
                  ) : (
                    "Submit Data"
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
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AddShoes;
