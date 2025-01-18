import React from "react";

function Tooltip({ name }) {
  return (
    <div className=" transform -translate-x-1/2 opacity-0 transition-opacity duration-300 ease-in-out tooltip">
      {name}
    </div>
  );
}

export default Tooltip;
