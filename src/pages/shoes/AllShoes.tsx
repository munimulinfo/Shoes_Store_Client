import {
  useDeleteShoeMutation,
  useGetShoesWithEmailQuery,
} from "../../redux/featuers/shoes/shoesApi";
import { useAppSelector } from "../../redux/hooks";
import AddShoes from "./AddShoes";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import UpdateShoes from "./UpdateShoes";
import ShoesDetails from "./ShoesDetails";
import Swal from "sweetalert2";
const AllShoes = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: shoes, isLoading } = useGetShoesWithEmailQuery(user?.email);
  const [deleteShoe] = useDeleteShoeMutation();
  if (isLoading) {
    return <p>loding....</p>;
  }

  const handleShoesDelete = async (id: string) => {
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
        const result = await deleteShoe(id).unwrap();
        console.log(result);
        toast.success(result?.message);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between mt-10 lg:mx-10 py-4 rounded-lg lg:px-8 gradient-color items-center">
        <h1 className="uppercase text-2xl font-serif font-semibold text-white">
          Shoes-Store
        </h1>
        <div className="flex gap-4">
          <AddShoes></AddShoes>
          <button className="btn px-8 text-[15px] font-serif button-gradient text-white rounded-full uppercase">
            Filter Shoes
          </button>
        </div>
      </div>

      {/* // product show */}

      <div className="md:px-10 mt-10">
        <table className="overflow-x-auto table rounded-xl border-2 shadow shdow-xl border-gray-200 bg-yellow-50 ">
          {/* head */}
          <thead className=" button-gradient text-white font-semiboald font-sans uppercase text-[12px]">
            <tr className="">
              <th>Sl</th>
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
                <td>{index + 1}</td>
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
