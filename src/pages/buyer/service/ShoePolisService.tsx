import AddPolishRequest from "./AddPolishRequest";

const ShoePolisService = () => {
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
    </div>
  );
};

export default ShoePolisService;
