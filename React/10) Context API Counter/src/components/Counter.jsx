import { useContext } from "react";
import { CounterContext } from "../context/Counter";

const Counter = () => {
  const { count, increment, decrement, reset } = useContext(CounterContext);

  return (
    <div>
      <h1>Count {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
