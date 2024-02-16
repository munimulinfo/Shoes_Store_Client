import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { FaPersonSkating } from "react-icons/fa6";
import { useUpdateShoePolishRequestMutation } from "../../../redux/featuers/shoesService/shoeService.Api";
import { toast } from "sonner";
const CanceelShoePolishRequestModal = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loding, setLoading] = useState(false);
  const [canceelRequest, { isLoading }] = useUpdateShoePolishRequestMutation();
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
    formState: { errors },
  } = useForm();
  const handleSelsForm = async (data: FieldValues) => {
    try {
      setLoading(true);
      const canceelInfo = {
        id: id,
        data: {
          status: "canceel",
          canceelMessage: data?.canceelMessage,
        },
      };

      const res = await canceelRequest(canceelInfo).unwrap();
      toast.success(res?.message);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="btn  btn-outline btn-accent btn-sm text-white"
      >
        Canceel
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal px-2 lg:px-0  modal-bottom sm:modal-middle md:w-1/4 mx-auto"
          open
        >
          <form
            onSubmit={handleSubmit(handleSelsForm)}
            className="px-5 py-3 relative w-full rounded-lg bg-gray-100 shadow border-2"
            action=""
          >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-color">Canceel Message</span>
              </label>
              <textarea
                {...register("canceelMessage", {
                  required: true,
                })}
                placeholder="write canceel message"
                className="textarea textarea-error"
              />
              {errors.canceelMessage && (
                <span className="text-rose-500 animate-pulse">
                  Canceel Message Provide
                </span>
              )}
            </div>

            {/* // submit button  */}
            <div className="form-control w-full mt-4">
              <button type="submit" className="btn button-gradient text-white">
                {loding || isLoading ? (
                  <FaPersonSkating className="animate-bounce" />
                ) : (
                  "Cancell Request"
                )}
              </button>
            </div>
            {/* //modal close butto  */}
            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-1 top-1 bg-red-600"
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

export default CanceelShoePolishRequestModal;
