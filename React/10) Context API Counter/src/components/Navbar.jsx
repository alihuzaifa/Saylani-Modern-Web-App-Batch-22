import { useContext } from "react";
import { CounterContext } from "../context/Counter";

const Navbar = () => {
  const { count } = useContext(CounterContext);

  return (
    <div style={{ backgroundColor: "red", padding: "10px" }}>
      Navbar Component Count {count}
    </div>
  );
};

export default Navbar;
