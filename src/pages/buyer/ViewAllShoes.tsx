import { useGetShoesWithEmailQuery } from "../../redux/featuers/shoes/shoesApi";

const ViewAllShoes = () => {
  const { data } = useGetShoesWithEmailQuery({});
  console.log(data);
  return <div>View all Shoes</div>;
};

export default ViewAllShoes;
