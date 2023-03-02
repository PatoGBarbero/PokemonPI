import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemontypes } from "../actions";

const CreatePokemon = () => {
  const allTypes = useSelector((state) => state.pokemonstypes);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const [newPokemon, setNewPokemon] = useState({
    name: "",
    life_points: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "https://i0.wp.com/www.alphr.com/wp-content/uploads/2016/07/whos_that_pokemon.png?resize=738%2C320&ssl=1",
    tipo: [],
  });

  const changePokemon = (e) => {
    setError(null);
    setNewPokemon({
      ...newPokemon,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getPokemontypes());
  }, []);

  const addTipo = (e) => {
    let tipos = newPokemon.tipo;
    tipos.push(e.target.value);
    setNewPokemon({
      ...newPokemon,
      tipo: tipos,
    });
  };

  const eliminarTipo = (t) => {
    setNewPokemon({
      ...newPokemon,
      tipo: newPokemon.tipo.filter((tipo) => tipo !== t),
    });
  };

  const validate = () => {
    if (newPokemon.name.length < 3 || newPokemon.name.length >= 15) {
      setError("El nombre debe contener entre 3 y 15 caracteres");
      return false;
    }
    if (
      newPokemon.life_points < 1 ||
      newPokemon.attack < 1 ||
      newPokemon.defense < 1 ||
      newPokemon.speed < 1 ||
      newPokemon.height < 1 ||
      newPokemon.weight < 1
    ) {
      setError("el pokemon debe tener mas 1 punto de vida");
      return false;
    }
    if (
      newPokemon.life_points === "" ||
      newPokemon.attack === "" ||
      newPokemon.defense === "" ||
      newPokemon.speed === "" ||
      newPokemon.height === "" ||
      newPokemon.weight === "" ||
      newPokemon.tipo.length < 1
    ) {
      setError("Debe completar todos los campos");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (validate()) {
      const res = await axios.post(
        "http://localhost:3001/pokemons",
        newPokemon
      );
      if (res.status === 200) {
        alert("Pokemon creado correctamente!");
      }
    }
  };

  return (
    <div className="create-container ">
      <Link className="textInicio" to="/home">
        Inicio
      </Link>

      <h1>Nuevo pokemon</h1>
      <div className="detailPokemon">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input onChange={changePokemon} type="text" name="name" />
          </div>
          <div>
            <label>Puntos de vida</label>
            <input onChange={changePokemon} type="number" name="life_points" />
          </div>
          <div>
            <label>Ataque</label>
            <input onChange={changePokemon} type="number" name="attack" />
          </div>
          <div>
            <label>Defensa</label>
            <input onChange={changePokemon} type="number" name="defense" />
          </div>
          <div>
            <label>Velocidad</label>
            <input onChange={changePokemon} type="number" name="speed" />
          </div>
          <div>
            <label>Altura</label>
            <input onChange={changePokemon} type="number" name="height" />
          </div>
          <div>
            <label>Peso</label>
            <input onChange={changePokemon} type="number" name="weight" />
          </div>
          <div>
            <label>Tipos</label>
            <select onChange={addTipo}>
              <option value="ALL">todos</option>
              {allTypes?.map((c) => {
                return <option value={c.name}>{c.name}</option>;
              })}
            </select>
          </div>

          <div>
            <h3>Tipos:</h3>
            <div>
              {newPokemon.tipo.map((t) => (
                <div>
                  {t}{" "}
                  <span
                    className="cursorPointer xEliminar"
                    onClick={() => eliminarTipo(t)}
                  >
                    X
                  </span>
                </div>
              ))}
            </div>
          </div>
          {error ? <h3 className="errorCreate">{error}</h3> : null}
          <button type="submit">Crear pokemon</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePokemon;
