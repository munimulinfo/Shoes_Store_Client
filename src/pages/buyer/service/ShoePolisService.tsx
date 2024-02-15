import { FaTrash } from "react-icons/fa";
import {
  useDeleteShoePolishRequestMutation,
  useGetShoePolishRequestwithEmailQuery,
} from "../../../redux/featuers/shoesService/shoeService.Api";
import { useAppSelector } from "../../../redux/hooks";
import AddPolishRequest from "./AddPolishRequest";
import ShoePolishOrderDetails from "./ShoePolishOrderDetails";
import EditShoePolishOrder from "./EditShoePolishOrder";
import Swal from "sweetalert2";
import { toast } from "sonner";

const ShoePolisService = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: shoePolish } = useGetShoePolishRequestwithEmailQuery(
    user?.email
  );

  const [deleteShoePloishRequest] = useDeleteShoePolishRequestMutation();

  const handlePolishRequestDelete = async (id: string) => {
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
        const result = await deleteShoePloishRequest(id).unwrap();
        toast.success(result?.message);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between md:mx-10 px-2 md:mt-10 mt-16 py-4 rounded-lg lg:px-8 gradient-color">
        <h1 className="uppercase md:text-2xl text-[12px] font-serif font-semibold text-white">
          Polish Request
        </h1>
        <div className="flex md:gap-4 gap-2">
          <AddPolishRequest></AddPolishRequest>
        </div>
      </div>
      {/* //content  */}
      <div className="md:px-10 mt-10 sm:overflow-x-auto rounded overflow-y-auto ">
        <table className="overflow-x-auto table rounded-xl border-2 shadow shdow-xl border-gray-200 bg-yellow-50 ">
          {/* head */}
          <thead className=" button-gradient text-white font-semiboald font-sans uppercase text-[12px]">
            <tr className="">
              <th>Sl</th>
              <th>Image</th>
              <th>OrderNo</th>
              <th>Status</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {shoePolish?.data?.map((item: any, index: number) => (
              <tr key={index} className="border-b border-slate-5">
                <td>{index + 1}</td>
                <td>
                  <img
                    className="mask rounded w-14 h-14"
                    src={item?.shoeImage}
                    alt="medicine"
                  />
                </td>
                <td className="font-medium uppercase">{item?.orderNo}</td>
                <td className="">
                  <p className="badge bg-red-600 text-white uppercase badge-outline">
                    {item?.status}
                  </p>
                </td>
                <td>
                  <ShoePolishOrderDetails {...item}></ShoePolishOrderDetails>
                </td>
                <td>
                  <EditShoePolishOrder {...item}></EditShoePolishOrder>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handlePolishRequestDelete(item?._id)}
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

export default ShoePolisService;
