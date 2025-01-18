import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      setTime(current.toLocaleTimeString("en-US", { timeZone: "pst" }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="clock">pst {time}</div>;
}

export default Clock;