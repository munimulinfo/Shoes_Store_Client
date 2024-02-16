import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "sonner";

import moment from "moment";
import {
  useDeleteCustomizedShoeRequestMutation,
  useGetAllCustomizedShoeQuery,
} from "../../../redux/featuers/shoesService/shoeCustomized.Api";
import ShoeCustomizedOrderDetails from "../../buyer/service/shoeCustomized/ShoeCustomizedOrderDetails";

const AllShoeCustomizedRequest = () => {
  const { data: allCustomizedShoe } = useGetAllCustomizedShoeQuery(undefined);
  const [deletCustomizedShoe] = useDeleteCustomizedShoeRequestMutation();

  const handleCustomizedShoeDelete = async (id: string) => {
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
        const result = await deletCustomizedShoe(id).unwrap();
        toast.success(result?.message);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between md:mx-10 px-2 md:mt-10 mt-16 py-4 rounded-lg lg:px-8 gradient-color">
        <h1 className="uppercase md:text-2xl text-[12px] font-sans font-semibold text-white">
          All Customized Shoes Request
        </h1>
        <div>nissan</div>
      </div>
      {/* //content  */}
      <div className="md:px-10 mt-10 sm:overflow-x-auto rounded overflow-y-auto ">
        <table className="overflow-x-auto table rounded-xl border-2 shadow shdow-xl border-gray-200 bg-yellow-50 ">
          {/* head */}
          <thead className=" button-gradient text-white font-semiboald font-sans uppercase text-[12px]">
            <tr className="">
              <th>Sl</th>
              <th>OrderNo</th>
              <th>Date</th>
              <th>Status</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allCustomizedShoe?.data?.map((item: any, index: number) => (
              <tr key={index} className="border-b border-slate-5">
                <td>{index + 1}</td>
                <td className="font-medium uppercase">{item?.orderNo}</td>
                <td className="font-medium">
                  {moment(item?.orderDate).format("MMM Do YY")}
                </td>
                <td className="">
                  <p
                    className={` ${
                      item?.status === "aproved" ? "bg-accent" : "bg-red-600"
                    } badge  text-white uppercase badge-outline`}
                  >
                    {item?.status}
                  </p>
                </td>
                <td>
                  <ShoeCustomizedOrderDetails
                    {...item}
                  ></ShoeCustomizedOrderDetails>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleCustomizedShoeDelete(item?._id)}
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

export default AllShoeCustomizedRequest;
