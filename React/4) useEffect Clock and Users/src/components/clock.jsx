import { useEffect, useState } from "react";

const Clock = () => {
  const [timer, setTimer] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      const datetime = new Date().toLocaleTimeString();
      setTimer(datetime);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h1>Timer</h1>
      <h2>{timer}</h2>
    </div>
  );
};

export default Clock;
