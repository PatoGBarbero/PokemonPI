import React, { useState, useEffect } from "react";

import {
  getPokemons,
  filterPokemonsByTypes,
  getPokemontypes,
  filterCreated,
  orderByname,
  getPokemonId,
} from "../actions";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Card from "./card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemons = currentPage * pokemonsPerPage;
  const indexOfFirsttPokemons = indexOfLastPokemons - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirsttPokemons,
    indexOfLastPokemons
  );
  const allTypes = useSelector((state) => state.pokemonstypes);

  const settingCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getPokemontypes());
    setCurrentPage(1);
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    setCurrentPage(1);
    document.getElementById("reset").reset();
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByname(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterTypes(e) {
    dispatch(filterPokemonsByTypes(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className="home-container">
      <Link to="/create" className="shadow__btn">
        crear pokemon
      </Link>
      <h1 className="pi-pokemon">
        <img src="https://seeklogo.com/images/P/Pokemon-logo-497D61B223-seeklogo.com.png" />
      </h1>
      <div>
        <button
          className="shadow__btn"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          volver a cargar todos los pokemons
        </button>
      </div>
      <form id="reset">
        <select onChange={(e) => handleSort(e)}>
          <option>Elija el ordenamiento</option>
          <option value="asc">Ascendete</option>
          <option value="dsc">Descendente</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
        <select onChange={(e) => handleFilterTypes(e)}>
          <option value="ALL">Todos</option>
          {allTypes?.map((c) => {
            return <option value={c.name}>{c.name}</option>;
          })}
        </select>

        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Existentes</option>
        </select>
        <SearchBar setCurrentPage={setCurrentPage} />
        <Paginado
          pokemosPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          settingCurrentPage={settingCurrentPage}
          currentPage={currentPage}
        />
        <div className="containerCards">
          {currentPokemons.length > 0 ? (
            currentPokemons?.map((p) => {
              return (
                <Link key={p.id} to={"/detail/" + p.id}>
                  <Card
                    name={p.name}
                    image={p.img}
                    tipos={p.tipos || p.types}
                  />
                </Link>
              );
            })
          ) : (
            <h5>No se encontraron pokemons con esas caracteristicas</h5>
          )}
        </div>
      </form>
    </div>
  );
}
