import React, { useState } from "react";

import "./index.css";

const ToggleButton = ({ isToggle, setIsToggle }) => {
  return (
    <button
      className={`toggle-button ${isToggle ? "active" : ""}`}
      onClick={() => setIsToggle(!isToggle)}
    >
      <div className="toggle-circle"></div>
    </button>
  );
};

export default ToggleButton;
