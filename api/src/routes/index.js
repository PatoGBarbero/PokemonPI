const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const fetch = require("node-fetch");
const { Pokemon, Tipo } = require("../db");
const tipo = require("../models/tipo");
const { get } = require("../app");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const {
  getapiIdName,
  getAllPokemon,
  getTypes,
  getOnePokemon,
} = require("../utils");

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;

  if (name) {
    const pokemon = await Pokemon.findOne({
      where: { name },
      include: {
        model: Tipo,
        attributes: ["name"],
      },
    });
    if (pokemon) {
      res.status(200).json({
        ...pokemon.dataValues,
        tipos: pokemon.tipos.map((x) => x.name),
      });
    } else {
      const pokemonApi = await getapiIdName(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      res.status(200).json(pokemonApi);
    }
  } else {
    let pokemonTotal = await getAllPokemon();

    res.status(200).send(pokemonTotal);
  }
});

router.get("/types", async (req, res) => {
  try {
    let types = await getTypes();
    if (types.length) {
      res.status(200).json(types);
    } else {
      res.status(404).send("No se pudieron cargar los tipos");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let pokemon = await getOnePokemon(id);
    res.status(200).send(pokemon);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

router.post("/pokemons", async (req, res) => {
  try {
    const {
      name,
      color,
      life_points,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
      tipo,
    } = req.body;

    let pokemon = await Pokemon.create({
      name,
      color,
      life_points,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
    });

    tipo?.forEach(async (tipo) => {
      const found = await Tipo.findAll({
        where: {
          name: tipo,
        },
      });
      await pokemon.addTipo(found);
    });

    res.status(200).send("Pokemon creado correctamente");
  } catch (error) {
    console.log("ERROR EN POST POKEMON");
    console.log(error);
    console.log("ERROR EN POST POKEMON");
    res.status(404).send(error.message);
  }
});

module.exports = router;
