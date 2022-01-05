import { SpinnerDotted } from "spinners-react";

const Spinner = () => {
  return (
    <SpinnerDotted
      style={{
        color: "#0abab5",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Spinner;