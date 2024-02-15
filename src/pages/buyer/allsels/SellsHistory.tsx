import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  useDeletSellMutation,
  useGetAllSellQuery,
} from "../../../redux/featuers/sells/sellsApi";
import ShoesDetails from "../../seller/shoes/ShoesDetails";

const SellsHistory = () => {
  const [params, setParams] = useState({ filter: "" });
  const { data: sells, isLoading } = useGetAllSellQuery(params);
  const [deletSell] = useDeletSellMutation();
  if (isLoading) {
    return (
      <p className="text-center font-bold  mt-44 text-3xl text-black animate-bounce">
        loding....
      </p>
    );
  }
  const handleSellsDelete = async (id: string) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deletSell(id).unwrap();
        toast.success(result?.message);
      }
    });
  };

  return (
    <div className="px-2 md:px-0">
      <div className="flex justify-between md:mt-10 px-2 mt-16 lg:mx-10 py-4 rounded-lg md:px-8 gradient-color items-center">
        <h1 className="uppercase md:text-2xl text-[14px] font-serif font-semibold text-white">
          Sells-History
        </h1>
        <div className="flex gap-4">
          <select
            onChange={(event) => setParams({ filter: event.target.value })}
            className="select select-accent max-w-sm lg:w-56"
          >
            <option disabled defaultValue="">
              Filter By Date
            </option>
            <option value={""}>All Sells</option>
            <option value={"daily"}>Daily</option>
            <option value={"weekly"}>Weekly</option>
            <option value={"monthly"}>Monthly</option>
            <option value={"yearly"}>Yearly</option>
          </select>
        </div>
      </div>

      {/* // product show */}

      <div className="md:px-10 mt-10 sm:overflow-x-auto rounded overflow-y-auto">
        <table className="overflow-x-auto table rounded-xl border-2 shadow shdow-xl border-gray-200 bg-yellow-50 ">
          {/* head */}
          <thead className=" button-gradient text-white font-semiboald font-sans uppercase text-[12px]">
            <tr className="">
              <th>Sl</th>
              <th>Shoe</th>
              <th>Name</th>
              <th>brand</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sells?.data?.map((shoe: any, index: number) => (
              <tr key={index} className="border-b border-slate-5">
                <td>{index + 1}</td>
                <td>
                  <img
                    className="mask rounded w-14 h-14"
                    src={shoe?.producId?.image}
                    alt="medicine"
                  />
                </td>
                <td className="font-medium">{shoe?.producId?.name}</td>
                <td className="font-medium">{shoe?.producId?.brand}</td>

                <td className="space-x-2">{shoe?.producId?.price}</td>
                <td className="space-x-2">{shoe?.shoeQuantity}</td>
                <td>
                  <ShoesDetails {...shoe?.producId}></ShoesDetails>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleSellsDelete(shoe?._id)}
                    className=" bg-red-500 rounded-full bg-opacity-35 "
                  >
                    <FaTrash className="text-4xl text-red-500 p-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellsHistory;
