import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px] relative">
      {/* Text Spinner Container */}
      <div className="flex items-center justify-center text-4xl font-bold text-primary">
        <span className="italic ">R</span>
        {/* Spinning 'O' */}
        <span className="animate-spin text-blue-500">o</span>
        <span className="italic ">R</span>
      </div>
    </div>
  );
};
export default Spinner;
