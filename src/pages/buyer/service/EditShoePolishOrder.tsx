import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { FaRegEdit } from "react-icons/fa";
import { useUpdateShoePolishRequestMutation } from "../../../redux/featuers/shoesService/shoeService.Api";
type TEditShoePloish = {
  _id: string;
  phoneNumber: string;
  shoeImage: string;
  address: string;
  polishType: string;
  shineLevel: string;
  specialInstructions: string;
};

const EditShoePolishOrder = ({
  _id,
  phoneNumber,
  shoeImage,
  address,
  polishType,
  shineLevel,
  specialInstructions,
}: TEditShoePloish) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateShoePolishRequest] = useUpdateShoePolishRequestMutation();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=1e026c5eba4e0751bd71f1436ae6da99`;

  //Modl Function
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //Search Form Handle
  const { register, handleSubmit, reset } = useForm();
  const handleFormData = async (data: FieldValues) => {
    try {
      const toastId = toast.loading("Send Request.......");
      let imgUrl: string | undefined = undefined;
      if (data?.shoeImage?.length > 0) {
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

      const polishInfo = {
        id: _id,
        data: {
          phoneNumber: data.phoneNumber,
          shoeImage: imgUrl ? imgUrl : shoeImage,
          address: data.address,
          polishType: data.polishType,
          shineLevel: data.shineLevel,
          specialInstructions: data.specialInstructions,
        },
      };
      const res = await updateShoePolishRequest(polishInfo).unwrap();
      toast.success(res?.message, { id: toastId });
      reset();
      closeModal();
    } catch (error) {
      console.log(error);
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
        <dialog id="my_modal_5" className="modal" open>
          <div className="modal-box">
            <form onSubmit={handleSubmit(handleFormData)} action="">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">PhoneNumber</span>
                </label>
                <input
                  type="text"
                  defaultValue={phoneNumber}
                  {...register("phoneNumber")}
                  placeholder="Enter you Number"
                  className="input input-bordered input-error"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Address</span>
                </label>
                <input
                  type="text"
                  {...register("address")}
                  defaultValue={address}
                  placeholder="Enter you Address"
                  className="input input-bordered input-error"
                />
              </div>

              {/*Third  row  */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">PolishType</span>
                  </label>
                  <select
                    {...register("polishType")}
                    defaultValue={polishType}
                    className="select select-error select-bordered w-full "
                  >
                    <option disabled value="">
                      Select Type
                    </option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-color">ShineLevel</span>
                  </label>
                  <select
                    {...register("shineLevel")}
                    defaultValue={shineLevel}
                    className="select select-error select-bordered w-full "
                  >
                    <option disabled value="">
                      Select Shine
                    </option>
                    <option value="matte">Matte</option>
                    <option value="medium">Medium</option>
                    <option value="highGloss">HighGloss</option>
                  </select>
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
                    {...register("shoeImage")}
                    className="file-input file-input-error "
                  />
                </div>
              </div>

              {/* Fifth row */}

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">specialInstructions</span>
                </label>
                <textarea
                  {...register("specialInstructions")}
                  placeholder="write"
                  defaultValue={specialInstructions}
                  className="textarea textarea-error"
                />
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

export default EditShoePolishOrder;
