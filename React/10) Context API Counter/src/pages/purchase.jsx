import { useContext } from "react";
import { UserContext } from "../context";

const Purchase = () => {
   const data = useContext(UserContext);
   console.log(data);
   
  return (
    <>
      <h1>Purchase</h1>
      <p>Purchase content goes here.</p>
    </>
  );
};

export default Purchase;
