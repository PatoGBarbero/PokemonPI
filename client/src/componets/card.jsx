import React from "react";
import "./Card.css";

export default function Card({ name, image, tipos }) {
  return (
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <p class="title">
            <img src={image} alt="img not found" width="200px" height="250px" />
          </p>
        </div>
        <div class="flip-card-back">
          <h1>{name}</h1>
          <p class="title">
            Tipos:{" "}
            {tipos.map((tipo) => (
              <span className="tipos">{tipo}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
