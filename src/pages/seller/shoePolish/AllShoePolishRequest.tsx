import {
  useDeleteShoePolishRequestMutation,
  useGetAllShoePolishRequestQuery,
  useUpdateShoePolishRequestMutation,
} from "../../../redux/featuers/shoesService/shoeService.Api";
import ShoePolishOrderDetails from "../../buyer/service/shoePolish/ShoePolishOrderDetails";
import { FaTrash } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import Swal from "sweetalert2";
import { toast } from "sonner";
import CanceelShoePolishRequestModal from "./CanceelShoePolishRequestModal";

const AllShoePolishRequest = () => {
  const { data: allShoePolish } = useGetAllShoePolishRequestQuery(undefined);
  const [deleteShoePloishRequest] = useDeleteShoePolishRequestMutation();
  const [aproveShoeRequest] = useUpdateShoePolishRequestMutation();

  //Aproved shoe request
  const AprovedShoeRequest = async (id: string) => {
    const aproveInfo = {
      id: id,
      data: {
        status: "aproved",
        canceelMessage: "",
      },
    };
    const res = await aproveShoeRequest(aproveInfo).unwrap();
    toast.success(res?.message);
  };
  //delet shoe request
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
        <div className="flex md:gap-4 gap-2">Nissan</div>
      </div>
      {/* //content  */}
      <div className="md:px-10 mt-10 xs:overflow-x-auto rounded">
        <table className=" table rounded-xl border-2 shadow shdow-xl border-gray-200 bg-yellow-50 ">
          {/* head */}
          <thead className=" button-gradient text-white font-semiboald font-sans uppercase text-[12px]">
            <tr className="">
              <th>Sl</th>
              <th>Image</th>
              <th>Name</th>
              <th>OrderNo</th>
              <th>Status</th>
              <th>Details</th>
              <th>Canceel</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allShoePolish?.data?.map((item: any, index: number) => (
              <tr key={index} className="border-b border-slate-5">
                <td>{index + 1}</td>
                <td>
                  <img
                    className="mask rounded w-14 h-14"
                    src={item?.shoeImage}
                    alt="medicine"
                  />
                </td>
                <td>{item?.name}</td>
                <td className="font-medium uppercase">{item?.orderNo}</td>
                <td className="">
                  <p
                    className={` ${
                      item?.status === "aproved" ? "bg-accent" : "bg-red-600"
                    }  badge   text-white uppercase badge-outline`}
                  >
                    {item?.status}
                  </p>
                </td>
                <td>
                  <ShoePolishOrderDetails {...item}></ShoePolishOrderDetails>
                </td>
                <td>
                  <CanceelShoePolishRequestModal
                    id={item?._id}
                  ></CanceelShoePolishRequestModal>
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm btn-outline btn-accent "
                    >
                      Contoler
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content rounded-md w-32 m-2 flex flex-col gap-2 text-[16px] dropdownShadow p-2 bg-gray-100"
                    >
                      <li
                        onClick={() => AprovedShoeRequest(item?._id)}
                        className={`${
                          item.status === "aproved"
                            ? "btn-disabled cursor-not-allowed"
                            : ""
                        } btn gap-2 btn-accent btn-sm text-white`}
                      >
                        <RxUpdate className="size-4" />
                        Aproved
                      </li>
                      <li
                        onClick={() => handlePolishRequestDelete(item?._id)}
                        className="btn btn-accent btn-sm text-white"
                      >
                        <FaTrash className="size-4 text-rose-500" />
                        Delete
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllShoePolishRequest;
