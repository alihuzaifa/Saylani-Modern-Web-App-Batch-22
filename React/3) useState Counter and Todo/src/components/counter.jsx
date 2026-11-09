import { useState } from "react";
import "../styles/counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <section className="box counter">
      <h1>Counter Application</h1>
      <h2 className="count">{count}</h2>
      <div className="actions">
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>Increment</button>
      </div>
    </section>
  );
};

export default Counter;
