import {
  useDeleteMulltipleShoeMutation,
  useDeleteShoeMutation,
  useGetShoesWithEmailQuery,
} from "../../redux/featuers/shoes/shoesApi";
import { useState } from "react";
import AddShoes from "./AddShoes";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import UpdateShoes from "./UpdateShoes";
import ShoesDetails from "./ShoesDetails";
import Swal from "sweetalert2";
import SearchModal from "./SearchModal";
import { FaTrashCan } from "react-icons/fa6";
const AllShoes = () => {
  const [filter, setFilter] = useState({});
  const [delet, setDelet] = useState<string[]>([]);
  const { data: shoes, isLoading } = useGetShoesWithEmailQuery(filter);
  const [deleteShoe] = useDeleteShoeMutation();
  const [deleteMulltipleShoe] = useDeleteMulltipleShoeMutation();
  if (isLoading) {
    return <p>loding....</p>;
  }
  console.log(delet);

  const handleCheckboxChange = (shoeId: string) => {
    setDelet((prevDelet) => {
      if (prevDelet.includes(shoeId)) {
        return prevDelet.filter((id) => id !== shoeId);
      } else {
        return [...prevDelet, shoeId];
      }
    });
  };

  const handleShoesDelete = async (id: string) => {
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
        const result = await deleteShoe(id).unwrap();
        toast.success(result?.message);
      }
    });
  };

  const deleteMultipullShoes = async () => {
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
        const result = await deleteMulltipleShoe(delet).unwrap();
        toast.success(result?.message);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between mt-10 lg:mx-10 py-4 rounded-lg lg:px-8 gradient-color items-center">
        <h1 className="uppercase text-2xl font-serif font-semibold text-white">
          Manage-Shoes
        </h1>
        <div className="flex gap-4">
          <AddShoes></AddShoes>
          <SearchModal setFilter={setFilter}></SearchModal>
        </div>
      </div>

      {/* // product show */}

      <div className="md:px-10 mt-10">
        <table className="overflow-x-auto table rounded-xl border-2 shadow shdow-xl border-gray-200 bg-yellow-50 ">
          {/* head */}
          <thead className=" button-gradient text-white font-semiboald font-sans uppercase text-[12px]">
            <tr className="">
              <th>
                <button
                  onClick={deleteMultipullShoes}
                  className={`${
                    delet.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={delet?.length === 0}
                >
                  <FaTrash className="text-xl text-white" />
                </button>
              </th>
              <th>Shoe</th>
              <th>Name</th>
              <th>brand</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {shoes?.data?.map((shoe: any, index: number) => (
              <tr key={index} className="border-b border-slate-5">
                <td>
                  <input
                    className="mr-3"
                    onChange={() => handleCheckboxChange(shoe?._id)}
                    type="checkbox"
                    name="complet"
                    id="complet"
                    checked={delet.includes(shoe?._id)}
                  />
                </td>
                <td>
                  <img
                    className="mask rounded w-14 h-14"
                    src={shoe?.image}
                    alt="medicine"
                  />
                </td>
                <td className="font-medium">{shoe?.name}</td>
                <td className="font-medium">{shoe?.brand}</td>
                <td>
                  <ShoesDetails {...shoe}></ShoesDetails>
                </td>

                <td className="space-x-2">
                  <UpdateShoes {...shoe}></UpdateShoes>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleShoesDelete(shoe?._id)}
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

export default AllShoes;
