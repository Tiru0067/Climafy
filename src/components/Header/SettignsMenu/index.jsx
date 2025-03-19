import { useState, useRef, useEffect, useContext } from "react";
import { RiMenuUnfold4Line } from "react-icons/ri";

import "./index.css";
import ToggleButton from "./ToggleButton";
import ThemeContext from "../../../context/ThemeContext";
import DataContext from "../../../context/DataContext";

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const {
    fahrenheit,
    setFahrenheit,
    inches,
    setInches,
    mph,
    setMph,
    is12Hour,
    setIs12Hour,
  } = useContext(DataContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="settings-menu">
      <div className="settings-menu-toggle">
        <label className="settings-menu-label">MENU</label>
        <button
          className="settings-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <RiMenuUnfold4Line />
        </button>
      </div>
      <ul
        className={`settings-menu-list ${isOpen ? "active" : ""}`}
        {...(isOpen ? {} : { inert: true })}
      >
        <li className="settings-menu-item">
          <div className="menu-item-content">
            <span className="menu-item-label">Use Fahrenheit</span>
            <span className="default-label">Default: Celsius</span>
          </div>
          <ToggleButton isToggle={fahrenheit} setIsToggle={setFahrenheit} />
        </li>
        <li className="settings-menu-item">
          <div className="menu-item-content">
            <span className="menu-item-label">Use Mph</span>
            <span className="default-label">Default: Km/h</span>
          </div>
          <ToggleButton isToggle={mph} setIsToggle={setMph} />
        </li>
        <li className="settings-menu-item">
          <div className="menu-item-content">
            <span className="menu-item-label">Use Inches</span>
            <span className="default-label">Default: MM</span>
          </div>
          <ToggleButton isToggle={inches} setIsToggle={setInches} />
        </li>
        <li className="settings-menu-item">
          <div className="menu-item-content">
            <span className="menu-item-label">Use 12-Hour Format</span>
            <span className="default-label">Default: 24-Hour Format</span>
          </div>
          <ToggleButton isToggle={is12Hour} setIsToggle={setIs12Hour} />
        </li>
        <li className="settings-menu-item">
          Enable Dark mode
          <ToggleButton isToggle={darkMode} setIsToggle={setDarkMode} />
        </li>
      </ul>
    </div>
  );
};

export default SettingsMenu;
