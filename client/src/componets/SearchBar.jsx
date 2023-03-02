import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import "./SearchBar.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    setCurrentPage(1);
    e.preventDefault();
    if (name !== "") {
      dispatch(getNamePokemons(name.toLowerCase()));
      setName("");
    } else {
      alert("Ingrese un nombre válido");
    }
  }

  return (
    <div>
      <input
        type="text"
        name="text"
        value={name}
        class="input"
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
      />
      <button class="button" type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
