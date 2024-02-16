import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useVerifyShoesQuery } from "../../../../redux/featuers/shoes/shoesApi";
import { FieldValues, useForm } from "react-hook-form";
import Lottie from "lottie-react";
import moment from "moment";
import searChingAnimation from "../../../../assets/Verify-Animation/Animation - 1708085422033.json";
import { toast } from "sonner";

const VerifyShoes = () => {
  const [id, setId] = useState<string>("");
  console.log(id);
  const { data: polishData, isError } = useVerifyShoesQuery(id, { skip: !id });
  if (isError) {
    toast.error("Product Id is Invalid");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    setId(data?.id);
  };

  return (
    <div>
      <div className="flex justify-between md:mx-10 relative px-2 md:mt-10 mt-16 py-4 rounded-lg lg:px-8 gradient-color">
        <h1 className="uppercase md:text-2xl text-[12px] font-serif font-semibold text-white">
          Verify Shoes
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <input
            type="text"
            {...register("id", { required: true })}
            placeholder="Search By ProductId"
            className="input input-bordered input-accent mb-1 w-full lg:w-[250px]"
          />
          {errors.id && (
            <p className="text[8px]  absolute bottom-0 animate-pulse text-rose-400">
              Please provide ProductId
            </p>
          )}
          <button
            type="submit"
            className={`bg-white px-2 mb-1 rounded-md border border-accent hover:border-[3px]`}
          >
            <FcSearch className="size-7 text-white"></FcSearch>
          </button>
        </form>
      </div>
      {/* //content   */}
      {polishData?.data ? (
        <div className="card card-side bg-gray-100 shadow-2xl md:w-3/4 mx-auto mt-16 ">
          <figure className="gradient-color flex justify-center items-center md:w-[250px]">
            <img
              className="rounded-full w-[150px] border-[3px] border-accent h-[150px]"
              src={polishData?.data?.image}
              alt="shoeimage"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title uppercase ">Comapny: MH-SHOES</h2>
            <div className="grid grid-cols-2">
              <h3>
                <span className="verifyshoesTag">ShoeName :</span>
                {polishData?.data?.name}
              </h3>
              <h3>
                <span className="verifyshoesTag">ProductId :</span>
                {polishData?.data?.productId}
              </h3>
              <h3>
                <span className="verifyshoesTag">Brand :</span>
                {polishData?.data?.brand}
              </h3>
              <h3>
                <span className="verifyshoesTag">Model :</span>
                {polishData?.data?.model}
              </h3>
              <h3>
                <span className="verifyshoesTag">Price :</span>$
                {polishData?.data?.price}
              </h3>
              <h3>
                <span className="verifyshoesTag">Style :</span>
                {polishData?.data?.style}
              </h3>
              <h3>
                <span className="verifyshoesTag">Size :</span>
                {polishData?.data?.size}
              </h3>
              <h3>
                <span className="verifyshoesTag">Color :</span>
                {polishData?.data?.color}
              </h3>
              <h3>
                <span className="verifyshoesTag">Meterial :</span>
                {polishData?.data?.material}
              </h3>
              <h3>
                <span className="verifyshoesTag">ReleaseDate:</span>
                {moment(polishData?.data?.releaseDate).format("MMM Do YY")}
              </h3>
              <h3>
                <span className="verifyshoesTag">Available Quantity :</span>
                {polishData?.data?.quantity}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Lottie
            className="size-96"
            animationData={searChingAnimation}
            loop={true}
          />
          <h1 className="text-xl font-bold animate-pulse text-rose-500  font-sans text-center">
            Search Product With Valid Product Id
          </h1>
        </div>
      )}
    </div>
  );
};

export default VerifyShoes;
