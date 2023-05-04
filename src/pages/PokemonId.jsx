import { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgres = (stat_base * 100) / 255;
    return `${percentBarProgres}%`;
  };

  return (
    <section>
      <Header />

      <section className="px-2 py-14">

        <article className="max-w-[768px] mx-auto shadow-xl p-2">
          {/*Seccion superior*/}

          <section className="bg-gradient-to-b relative h-[150px]">
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>

          {/*Informacion general*/}
          <section>
            <div>
              <h3 className="flex justify-center text-2xl font-semibold py-2 shadow-md shadow-yellow-600 text-yellow-600"># {pokemon?.id}</h3>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2 className="py-2 px-2 capitalize font-bold text-2xl text-yellow-600 shadow-md shadow-yellow-600">{pokemon?.name}</h2>
              <hr />
            </div>

            <div className="flex justify-center gap-6 text-center py-4 font-semibold text-lg text-yellow-600">
              <div>
                <h5>Weight</h5>
                <span>{pokemon?.weight}</span>
              </div>

              <div>
                <h5>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>

            <section className="grid md:grid-cols-2 gap-4">
              {/*Tipos*/}
              <section className="text-center">
                <h3 className="font-bold text-xl text-yellow-600">Types</h3>

                <section className="grid grid-cols-2 gap-4 mt-4">
                  {pokemon?.types.map(type => 
                    <article
                      className="p-2 px-8 border-[2px] border-yellow-400 capitalize rounded-xl font-bold text-yellow-600"
                      key={type.type.name}
                    >
                      {type.type.name}
                    </article>
                  )}
                </section>
              </section>

              {/*Habilidades*/}
              <section className="text-center">
                <h3 className="font-bold text-xl  text-yellow-600">Abilities</h3>

                <section className="grid grid-cols-2 gap-4 mt-4 ">
                  {pokemon?.abilities.map(ability =>
                    <article
                      className="p-2 px-8 border-[2px] border-yellow-400 capitalize rounded-xl font-bold text-yellow-600"
                      key={ability.ability.name}
                    >
                      {ability.ability.name}
                    </article>
                  )}
                </section>
              </section>
            </section>
          </section>

          {/*Seccion de stats*/}
          <section>
            <h3>Stats</h3>

            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className="flex justify-between">
                    <h5 className="capitalize text-yellow-600 font-bold">{stat.stat.name}:</h5>

                    <span className="text-yellow-600 font-bold">{stat.base_stat}/255</span>
                  </section>

                  <div className="bg-gray-100 h-6 rounded-sm">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className={`h-full ${getPercentStatBar(
                        stat.base_stat
                      )} bg-gradient-to-r from-yellow-300 to-yellow-500`}
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      </section>
    </section>
  );
};

export default PokemonId;
