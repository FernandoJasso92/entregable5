import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const bordersByType = {
    normal: "border-pink-900",
    fighting: "border-orange-800",
    flying: "",
    poison: "border-purple-800",
    ground: "border-yellow-900",
    rock: "border-gray-400",
    bug: "border-green-500",
    ghost: "border-indigo-600",
    steel: "border-gray-500",
    fire: "border-orange-500",
    water: "border-blue-400",
    grass: "border-green-200",
    electric: "border-yellow-400",
    psychic: "border-purple-400",
    ice: "border-blue-200",
    dragon: "border-teal-400",
    dark: "border-black",
    fairy: "border-pink-400",
    unknown: "border-red-800",
    shadow: "border-gray-900",

};

const backgroundByType = {
    normal: "from-pink-900 to-pink-700",
    fighting: "from-orange-900 to-orange-700",
    flying: "",
    poison: "from-purple-800  to-purple-500",
    ground: "from-yellow-900  to-yellow-700",
    rock: "from-gray-400  to-gray-200",
    bug: "from-green-600  to-green-400",
    ghost: "from-indigo-600  to-indigo-400",
    steel: "from-gray-500 to-gray-300",
    fire: "from-orange-500 to-orange-300",
    water: "from-blue-500 to-blue-300",
    grass: "from-green-300 to-green-200",
    electric: "from-yellow-400 to-yellow-200",
    psychic: "from-purple-500 to-purple-300",
    ice: "from-blue-300 to-blue-100 ",
    dragon: "from-teal-500 to-teal-100",
    dark: "from-black to-gray-700",
    fairy: "from-pink-500 to-pink-200",
    unknown: "from-red-800 to-red-600",
    shadow: "from-gray-900 to-gray-700",
}

const textCard = {
    normal: "text-pink-900 font-bold",
    fighting: "text-orange-900 font-bold",
    flying: "",
    poison: "text-purple-800 font-bold",
    ground: "text-yellow-900 font-bold",
    rock: "text-gray-400 font-bold",
    bug: "text-green-600 font-bold",
    ghost: "text-indigo-600 font-bold",
    steel: "text-gray-500 font-bold",
    fire: "text-orange-500 font-bold",
    water: "text-blue-500 font-bold",
    grass: "text-green-600 font-bold",
    electric: "text-yellow-400 font-bold",
    psychic: "text-purple-500 font-bold",
    ice: "text-blue-300 font-bold",
    dragon: "text-teal-500 font-bold",
    dark: "text-black font-bold",
    fairy: "text-pink-500 font-bold",
    unknown: "text-red-800 font-bold",
    shadow: "text-gray-900 font-bold",
}

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()

    const types = pokemon?.types.slice(0, 2).map(type => type.type.name).join(" / ")

    useEffect(() => {
        axios.get(pokemonUrl)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.log(err))
    }, [])
    
  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>
        {/* Seccion superior */}
        <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
        <div className="absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2">
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>
        </section>

        {/* Seccion inferior*/}
        <section className="capitalize">

            <h3 className="mt-10 text-xl font-semibold">{pokemon?.name}</h3>
            <h4 className="font-semibold">{types}</h4>
            <span className=" font-semibold">Types</span>

            <hr />

            <section className={`grid grid-cols-3 gap-2 p-2 ${textCard[pokemon?.types[0].type.name]}`}>
                {pokemon?.stats.map(stat => (
                        <div key={stat.stat.name}>
                            <h5>{stat.stat.name}</h5>
                            <span>{stat.base_stat}</span>
                        </div>
                    ))}
            </section>

        </section>

    </Link>
    
  )
}

export default PokemonCard