const fetch = require("node-fetch");
const { Pokemon, Tipo } = require("../db");

const getApiInfo = async (link) => {
  const pokemons = { pokes: null, next: "" };
  await fetch(link)
    .then((res) => res.json())
    .then((data) => {
      return {
        urls: data.results.map((u) => u.url),
        next: data.next,
      };
    })
    .then(async (data) => {
      await Promise.all(
        data.urls.map((u) =>
          fetch(u)
            .then((res) => res.json())
            .catch((err) => {
              throw new Error(err.message);
            })
        )
      )
        .then((data) => {
          pokemons.pokes = data.map((p) => {
            return {
              id: p.id,
              name: p.name,
              life_points: p.stats[0].base_stat,
              attack: p.stats[1].base_stat,
              defense: p.stats[2].base_stat,
              speed: p.stats[5].base_stat,
              height: p.height,
              weight: p.weight,
              img: p.sprites.other.dream_world.front_default,
              types: p.types.map((y) => y.type.name),
            };
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
      pokemons.next = data.next;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return pokemons;
};

const getapiIdName = async (valor) => {
  let pokemons = null;
  await fetch(valor)
    .then((res) => res.json())
    .then((data) => {
      pokemons = {
        id: data.id,
        name: data.name,
        life_points: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        img: data.sprites.other.dream_world.front_default,
        types: data.types.map((y) => y.type.name),
      };
    })
    .catch((error) => {
      console.log(error);
    });
  return pokemons;
};

const getDbInfo = async () => {
  const pokemon23 = await Pokemon.findAll({
    include: {
      model: Tipo,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const mp = await pokemon23.map((d) => {
    return {
      ...d.dataValues,
      tipos: d.tipos.map((t) => t.name),
    };
  });
  return mp;
};

const getAllPokemon = async () => {
  const apiInfo = await getApiInfo("https://pokeapi.co/api/v2/pokemon");
  const apiInfo2 = await getApiInfo(apiInfo.next);
  const sumaapi = apiInfo.pokes.concat(apiInfo2.pokes);

  const dbInfo = await getDbInfo();

  const infoTotal = sumaapi.concat(dbInfo);
  return infoTotal;
};

const getTypes = async () => {
  const types = await Tipo.findAll();
  if (!types.length) {
    let tipoDb = null;
    await fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => {
        tipoDb = data.results.map((t) => {
          return { name: t.name };
        });
      });
    await Tipo.bulkCreate(tipoDb, {
      returning: true,
    });

    let typesCreated = await Tipo.findAll();
    return typesCreated;
  } else {
    return types;
  }
};

const getOnePokemon = async (id) => {
  try {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id
      )
    ) {
      const pokemon = await Pokemon.findOne({
        where: { id },
        include: {
          model: Tipo,
          attributes: ["name"],
        },
      });
      if (pokemon) {
        return {
          ...pokemon.dataValues,
          tipos: pokemon.dataValues.tipos.map((x) => x.name),
        };
      } else {
        return "No se ha encontrado ningún pokemon";
      }
    } else {
      const pokemonApi = await getapiIdName(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      if (pokemonApi) {
        return pokemonApi;
      } else {
        return "No se ha encontrado ningun pokemon";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getapiIdName,
  getAllPokemon,
  getTypes,
  getOnePokemon,
};
