import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaCartPlus } from "react-icons/fa6";
import { FaPersonSkating } from "react-icons/fa6";
import { useAddSellMutation } from "../../redux/featuers/sells/sellsApi";
import { useAppSelector } from "../../redux/hooks";
type TSelsFormProps = {
  quantity: number;
  _id: string;
};
const SelsForm = ({ quantity, _id }: TSelsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loding, setLoading] = useState(false);
  const [addSell, { isLoading }] = useAddSellMutation();
  const user = useAppSelector((state) => state.auth?.user);
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
  const handleSelsForm = async (data: any) => {
    try {
      if (parseInt(data?.shoeQuantity) > quantity) {
        return toast.error(
          `At this time, the requested quantity is not available in stock: ${data?.shoeQuantity} current stock is ${quantity}`
        );
      }
      setLoading(true);
      const product = {
        producId: _id,
        name: data.name,
        shoeQuantity: parseInt(data?.shoeQuantity, 10),
        sellDate: data?.sellDate,
      };
      const res = await addSell(product).unwrap();
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
        className=" bg-green-500 text-center text-white rounded-full"
      >
        <FaCartPlus className="px-2 py-2 text-4xl"></FaCartPlus>
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle md:w-1/4 mx-auto"
          open
        >
          <form
            onSubmit={handleSubmit(handleSelsForm)}
            className="px-5 py-3 relative w-full rounded-lg bg-gray-100 shadow border-2"
            action=""
          >
            <h1 className="text-lg text-center mb-2 font-serif text-emerald-500 uppercase font-bold ">
              Sel Shoes
            </h1>
            {/* //first row  */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-color">Buyer name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                {...register("name", {
                  required: true,
                })}
                placeholder="Enter Buyer Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-rose-500 animate-pulse">
                  please provide Buyer Name
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
                {...register("shoeQuantity", {
                  required: true,
                })}
                placeholder="Enter shoe size"
                className="input input-bordered"
              />
              {errors.shoeQuantity && (
                <span className="text-rose-500 animate-pulse">
                  Please provide a valid positive integer for shoe quantity
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-color">Sell Date</span>
              </label>
              <input
                type="date"
                {...register("sellDate")}
                placeholder="Enter shoe quantity"
                className="input input-bordered"
              />
              {errors.sellDate && (
                <span className="text-rose-500 animate-pulse">
                  please provide Sell Date
                </span>
              )}
            </div>

            {/* // submit button  */}
            <div className="form-control w-full mt-4">
              <button
                type="submit"
                className="btn bg-emerald-500 text-white  font-serif hover:bg-emerald-500 border-0"
              >
                {loding || isLoading ? (
                  <FaPersonSkating className="animate-bounce" />
                ) : (
                  "Sell Product"
                )}
              </button>
            </div>
            {/* //model close button  */}
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

export default SelsForm;
