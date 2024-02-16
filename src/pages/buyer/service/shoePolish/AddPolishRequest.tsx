import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { useAddShoePolishRequestMutation } from "../../../../redux/featuers/shoesService/shoeService.Api";
import { toast } from "sonner";

const AddPolishRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [addPolishRequest] = useAddShoePolishRequestMutation();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=1e026c5eba4e0751bd71f1436ae6da99`;

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
      const imgdata = new FormData();
      imgdata.append("image", data?.shoeImage[0]);
      const response = await fetch(img_hosting_url, {
        method: "POST",
        body: imgdata,
      });
      const uploadImage = await response.json();
      if (uploadImage.success) {
        const imgUrl = uploadImage?.data?.display_url;
        const polishInfo = {
          name: user!.name,
          userId: user!.userId,
          email: user?.email,
          orderNo: `sp-${Math.random().toString().substring(2, 7)}`,
          phoneNumber: data.phoneNumber,
          shoeImage: imgUrl,
          address: data.address,
          polishType: data.polishType,
          shineLevel: data.shineLevel,
          specialInstructions: data.specialInstructions,
        };
        const res = await addPolishRequest(polishInfo).unwrap();
        toast.success(res?.message, { id: toastId });
        reset();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delet ShoePolish request

  return (
    <div>
      <button
        onClick={openModal}
        className="btn md:px-8 px-2 md:text-[15px] text-[10px] font-serif button-gradient text-white rounded-full uppercase"
      >
        New Request
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog id="my_modal_5" className="modal" open>
          <div className="modal-box">
            <form onSubmit={handleSubmit(handleFormData)} action="">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">PhoneNumber</span>
                </label>
                <input
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  placeholder="Enter you Number"
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
                  <span className="label-color">Address</span>
                </label>
                <input
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Enter you Address"
                  className="input input-bordered input-error"
                />
                {errors.address && (
                  <span className="text-rose-500 animate-pulse">
                    please provide Address
                  </span>
                )}
              </div>

              {/*Third  row  */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">PolishType</span>
                  </label>
                  <select
                    {...register("polishType", { required: true })}
                    className="select select-error select-bordered w-full "
                  >
                    <option disabled value="">
                      Select Type
                    </option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="custom">Custom</option>
                  </select>
                  {errors.polishType && (
                    <span className="text-rose-500 animate-pulse">
                      please provide PolishType
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">ShineLevel</span>
                  </label>
                  <select
                    {...register("shineLevel", { required: true })}
                    className="select select-error select-bordered w-full "
                  >
                    <option disabled value="">
                      Select Shine
                    </option>
                    <option value="matte">Matte</option>
                    <option value="medium">Medium</option>
                    <option value="highGloss">HighGloss</option>
                  </select>
                  {errors.shineLevel && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shineLevel
                    </span>
                  )}
                </div>
              </div>

              {/* Forurth-Row  */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">ShoeImage</span>
                  </label>
                  <input
                    type="file"
                    {...register("shoeImage", { required: true })}
                    className="file-input file-input-error "
                  />
                  {errors.shoeImage && (
                    <span className="text-rose-500 animate-pulse">
                      please provide shoeImage
                    </span>
                  )}
                </div>
              </div>

              {/* Fifth row */}

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">specialInstructions</span>
                </label>
                <textarea
                  {...register("specialInstructions", { required: true })}
                  placeholder="write"
                  className="textarea textarea-error"
                />
                {errors.specialInstructions && (
                  <span className="text-rose-500 animate-pulse">
                    please provide specialInstructions
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

export default AddPolishRequest;
