import React from "react";
import "./Info.scss";

function Login() {
  return (
    <div className="info container-fluid">
      <h1 className="info__title">
        Information <i className="fas fa-info-circle"></i>
      </h1>
      <p className="info__desc">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
        deserunt at repellendus libero similique quisquam ipsum distinctio
        maxime quam adipisci iste earum ab fuga nisi molestiae, culpa vel!
        <br />
        <br />
        Tempora, fugiat! Voluptates minus quod debitis officia! Deserunt
        veritatis nostrum quam expedita debitis quo libero porro distinctio
        molestiae nulla, laudantium aperiam molestias repellendus, ipsa vitae
        nobis dolorem temporibus alias! Aliquid, quos veniam.
      </p>
      <div className="info__author">
        Code & design by <a href="http://tesario.4fan.cz/">Vojtěch Tesař</a>
      </div>
    </div>
  );
}

export default Login;
