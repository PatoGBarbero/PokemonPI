import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./landingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const [spinner, setSpinner] = useState(false);

  const ingresar = () => {
    setSpinner(true);
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  return (
    <div className="LandingPage">
      <h1 className="bienvenido">
        <img src="https://seeklogo.com/images/P/Pokemon-logo-497D61B223-seeklogo.com.png" />
      </h1>
      {spinner ? (
        <div className="centrado">
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        </div>
      ) : (
        <button onClick={ingresar}>
          <button className="buttonHome">
            <span>Ingresar</span>
          </button>
        </button>
      )}
    </div>
  );
}
