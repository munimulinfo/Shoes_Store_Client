import { useAddShoesMutation } from "../../../redux/featuers/shoes/shoesApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { FaPersonSkating } from "react-icons/fa6";
import { useAppSelector } from "../../../redux/hooks";
import { TUpdateProps } from "./UpdateShoes";

const CreateVarient = ({
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
}: TUpdateProps) => {
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
        name: data?.name,
        image: imgUrl || image,
        productId: `mh-${Math.random().toString().substring(2, 9)}`,
        quantity: Number(data?.quantity),
        price: Number(data?.price),
        releaseDate: data?.releaseDate || new Date(),
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
        className="btn btn-sm text-[10px] font-serif bg-fuchsia-400 hover:bg-green-600 text-white rounded-lg uppercase"
      >
        Create <br></br>Varient
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
                    defaultValue={name}
                    {...register("name", { required: true })}
                    placeholder="Enter Shoe Name"
                    className="input input-bordered"
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
                    defaultValue={quantity}
                    {...register("quantity", { required: true })}
                    placeholder="Enter shoe quantity"
                    className="input input-bordered"
                  />
                  {errors.quantity && (
                    <span className="text-rose-500 animate-pulse">
                      please provide Shoe Quantity
                    </span>
                  )}
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
                    {...register("price", { required: true })}
                    placeholder="Enter price"
                    className="input input-bordered"
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
                    {...register("brand", {
                      required: true,
                    })}
                    placeholder="Enter brand"
                    className="input input-bordered"
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
                    defaultValue={model}
                    {...register("model", {
                      required: true,
                    })}
                    placeholder="Enter model"
                    className="input input-bordered"
                  />
                  {errors.model && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoe model
                    </span>
                  )}
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
                    {...register("color", {
                      required: true,
                    })}
                    placeholder="Enter color"
                    className="input input-bordered"
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
                    defaultValue={material}
                    {...register("meterial", {
                      required: true,
                    })}
                    className="select select-bordered w-full "
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
                    {...register("size", {
                      required: true,
                    })}
                    placeholder="Enter shoe size"
                    className="input input-bordered"
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
                    defaultValue={style}
                    {...register("style", {
                      required: true,
                    })}
                    placeholder="Enter Shoe Style"
                    className="input input-bordered w-full"
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
                  {...register("image")}
                  className="file-input "
                />
              </div>

              {/* // submit button  */}
              <div className="form-control w-full mt-4">
                <button
                  type="submit"
                  className="btn bg-emerald-500 text-white  font-serif button-gradient"
                >
                  {loading || isLoading ? (
                    <FaPersonSkating className="animate-bounce" />
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
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

export default CreateVarient;
