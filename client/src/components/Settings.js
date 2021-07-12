import React from "react";

import "./Settings.scss";

function Settings() {
  const handleColor = (e) => {
    const root = document.documentElement;
    root.style.setProperty("--" + e.target.id, e.target.value);
    localStorage.setItem(e.target.id, e.target.value);
  };

  const handleReset = () => {
    localStorage.removeItem("primary-color");
    localStorage.removeItem("secondary-color");
    localStorage.removeItem("text-color");

    const root = document.documentElement;
    root.style.setProperty("--primary-color", "#87c232");
    root.style.setProperty("--secondary-color", "#222629");
    root.style.setProperty("--text-color", "#ffffff");
  };

  return (
    <div className="settings container-fluid">
      <h1 className="settings__title">
        Settings <i className="fas fa-cog"></i>
      </h1>
      <form>
        <div className="form-input">
          <label htmlFor="primary-color">Primary color</label>
          <input
            type="color"
            id="primary-color"
            defaultValue="#87c232"
            onChange={(e) => handleColor(e)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="secondary-color">Secondary color</label>
          <input
            type="color"
            id="secondary-color"
            defaultValue="#222629"
            onChange={(e) => handleColor(e)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="text-color">Text color</label>
          <input
            type="color"
            id="text-color"
            defaultValue="#ffffff"
            onChange={(e) => handleColor(e)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleReset()}
        >
          Reset to default
        </button>
      </form>
    </div>
  );
}

export default Settings;
