import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { toast } from "sonner";
import { useAddCustomizedShoeRequestMutation } from "../../../../redux/featuers/shoesService/shoeCustomized.Api";

const AddShoeCustomized = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [addCustomizedShoe] = useAddCustomizedShoeRequestMutation();
  //Modl Function
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //Search Form Handle
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormData = async (data: FieldValues) => {
    try {
      const toastId = toast.loading("Send Request.......");
      const shoeInfo = {
        name: user!.name,
        userEmail: user?.email,
        userId: user?.userId,
        orderDate: new Date(),
        orderNo: `sc-${Math.random().toString().substring(2, 9)}`,
        model: data?.model,
        style: data?.style,
        size: Number(data?.size),
        color: data?.color,
        material: data?.material,
        address: data?.address,
        quantity: Number(data?.quantity),
        instructions: data?.instructions,
        phoneNumber: data?.phoneNumber,
      };
      const res = await addCustomizedShoe(shoeInfo).unwrap();
      toast.success(res?.message, { id: toastId });
      reset();
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  //delet ShoePolish request

  return (
    <div>
      <button
        onClick={openModal}
        className="btn md:px-8 px-2 md:text-[15px] text-[10px] font-serif button-gradient text-white rounded-full uppercase"
      >
        New Order
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog id="my_modal_5" className="modal" open>
          <div className="modal-box">
            <form onSubmit={handleSubmit(handleFormData)} action="">
              {/* root elemetn  */}
              <div className="grid md:grid-cols-2 gap-5 justify-center items-center">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">PhoneNumber</span>
                  </label>
                  <input
                    type="text"
                    {...register("phoneNumber", { required: true })}
                    placeholder="Enter your Number"
                    className="input input-bordered input-error"
                  />
                  {errors.phoneNumber && (
                    <span className="text-rose-500 animate-pulse">
                      please provide valid Phone Number
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Model</span>
                  </label>
                  <input
                    type="text"
                    {...register("model", { required: true })}
                    placeholder="type here"
                    className="input input-bordered input-error"
                  />
                  {errors.model && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoe Model
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Style</span>
                  </label>
                  <input
                    type="text"
                    {...register("style", { required: true })}
                    placeholder="type here"
                    className="input input-bordered input-error"
                  />
                  {errors.style && (
                    <span className="text-rose-500 animate-pulse">
                      please provide valid Phone Number
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Size</span>
                  </label>
                  <input
                    type="number"
                    {...register("size", { required: true })}
                    placeholder="type here"
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
                    <span className="label-color">Meterial</span>
                  </label>
                  <input
                    type="text"
                    {...register("material", { required: true })}
                    placeholder="type here"
                    className="input input-bordered input-error"
                  />
                  {errors.material && (
                    <span className="text-rose-500 animate-pulse">
                      please provide Meterial
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Color</span>
                  </label>
                  <input
                    type="text"
                    {...register("color", { required: true })}
                    placeholder="type here"
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
                    <span className="label-color">Address</span>
                  </label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    placeholder="type here"
                    className="input input-bordered input-error"
                  />
                  {errors.address && (
                    <span className="text-rose-500 animate-pulse">
                      please provide Valid Address
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">Quantity</span>
                  </label>
                  <input
                    type="number"
                    {...register("quantity", { required: true })}
                    placeholder="type here"
                    className="input input-bordered input-error"
                  />
                  {errors.quantity && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoe quantity
                    </span>
                  )}
                </div>
              </div>

              {/* //last element  */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Instructions</span>
                </label>
                <textarea
                  {...register("instructions", { required: true })}
                  placeholder="type here"
                  className="textarea textarea-error"
                />
                {errors.instructions && (
                  <span className="text-rose-500 animate-pulse">
                    please provide Valueable Instructions
                  </span>
                )}
              </div>

              {/* // submit button  */}
              <div className="form-control w-full mt-4">
                <button
                  type="submit"
                  className="btn  text-white  font-serif button-gradient"
                >
                  Add Request
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

export default AddShoeCustomized;
