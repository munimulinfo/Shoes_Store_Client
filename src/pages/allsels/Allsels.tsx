import { useState } from "react";
import { useGetShoesWithEmailQuery } from "../../redux/featuers/shoes/shoesApi";
import ShoesDetails from "../shoes/ShoesDetails";
import SelsForm from "./SelsForm";

const Allsels = () => {
  const [name, setName] = useState("");
  const { data: shoes } = useGetShoesWithEmailQuery({ name });
  console.log(shoes);
  return (
    <div>
      <div className="flex justify-between mt-10 lg:mx-10 py-4 rounded-lg lg:px-8 gradient-color items-center">
        <h1 className="uppercase text-2xl font-serif font-semibold text-white">
          Manage-Sels
        </h1>
        <div className="flex gap-4">
          <input
            onChange={(e) => setName(e.target.value)}
            type="search"
            placeholder="Search By Product name"
            className="input input-bordered input-accent w-full max-w-xl"
          />
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
              <th>Stock</th>
              <th>Details</th>
              <th>sels</th>
            </tr>
          </thead>
          <tbody>
            {shoes?.data?.map(
              (shoe: any, index: number) =>
                shoe.quantity > 0 && (
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
                    <td className="font-medium">{shoe?.quantity}</td>
                    <td>
                      <ShoesDetails {...shoe}></ShoesDetails>
                    </td>
                    <td className="space-x-2">
                      <SelsForm {...shoe}></SelsForm>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allsels;
