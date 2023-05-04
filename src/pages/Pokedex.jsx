import { useSelector } from 'react-redux'
import Header from '../components/pokedex/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {
    //? Array de pokemons antes de filtrar
    const [pokemons, setPokemons] = useState([])

    //? String para filtrar los pokemons por nombre
    const [pokemonName, setPokemonName] = useState("")

    //? Arreglo de tipos de pokemons posibles
    const [types, setTypes] = useState([])

    //? String de tipos de pokemon actual, cambio de acuerdo al select
    const [currentType, setCurrentType] = useState("")

    //? pagina actual
    const [currentPage, setCurrentPage] = useState(1)

    //? Estado global en donde se almacena el nombre del usuario
    const nameTrainer = useSelector(store => store.nameTrainer)

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

    const paginationLogic = () => {
        //Cantidad de pokemons por pagina
        const POKEMONS_PER_PAGES = 12

        //pokemons que se van a mostrar en la pagina actual
        const sliceStart = (currentPage -1) * POKEMONS_PER_PAGES
        const sliceEnd = sliceStart + POKEMONS_PER_PAGES
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

        //ultima pagina
        const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGES) || 1

        //Bloque actual
        const PAGES_PER_BLOCK = 5
        const actualBlock =Math.ceil(currentPage /  PAGES_PER_BLOCK)

        //Paginas que se van a mostrar en el bloque actual
        const pagesInBlock = []
        const minPage = (actualBlock -1) * PAGES_PER_BLOCK + 1
        const maxPage = actualBlock * PAGES_PER_BLOCK
        for(let i = minPage; i <= maxPage; i++){
            if(i <= lastPage) {
            pagesInBlock.push(i)
            }
        }

        return{pokemonInPage, lastPage, pagesInBlock}
    }

    const {lastPage, pagesInBlock, pokemonInPage} = paginationLogic()

    const handleClickPreviusPage = () => {
        const newCurrenPage = currentPage - 1
        if(newCurrenPage >= 1){
        setCurrentPage(newCurrenPage)
        }
    }

    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1
        if(newCurrentPage <= lastPage){
        setCurrentPage(newCurrentPage)
        }
    }


    useEffect(() => {
        if(!currentType){
        const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"

        axios.get(URL)
        .then((res)=> setPokemons(res.data.results))
        .catch((err)=> console.log(err))
        }
    }, [currentType])

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type"
        axios.get(URL)
        .then((res) => {
            const newTypes = res.data.results.map(type => type.name)
            setTypes(newTypes)
        })
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if(currentType){
        const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

        axios.get(URL)
        .then((res) => {
            const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
            setPokemons(pokemonsByType)
        })
        .catch((err) => console.log(err))
    }
    }, [currentType])

    useEffect(() => {
        setCurrentPage(1)
    }, [pokemonName, currentType])
    
    

  return (
    <section className='min-h-screen'>
        <Header />

        {/* Seccion de filtros y saludo */}
        <section className='py-6 px-2'>
            <h3 className='font-semibold text-center text-gray-600'> <span className='text-red-500 font-bold'> Welcome {nameTrainer} </span>, here you can find your 
            favorite pokemon </h3>

            <form onSubmit={handleSubmit}>
                <div className='flex justify-center py-4 relative'>
                    <input className='border-2 shadow-md rounded-md w-[300px]' id="pokemonName" type="text" placeholder='Search your pokemon' />
                    <button className='border-2 bg-red-500 text-white rounded-md w-28'>Search</button>
                </div>
                <select className='absolute right-28 rounded-md border-2 w-[100] border-black bg-red-500 text-white' onChange={(e) => setCurrentType(e.target.value)}>
                    <option value="">All</option>
                    {
                        types.map(type => <option className='capitalize' value={type} key={type}>{type}</option>)
                    }
                </select>
            </form>
        </section>

        {/*Paginacion*/}
        <ul className='flex gap-3 justify-center py-4 px-2 flex-wrap'>
            {/* Primera pagina*/}
            <li onClick={() => setCurrentPage(1)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<<"}</li>
            {/* Pagina anterior*/}
            <li onClick={handleClickPreviusPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<"}</li>

            {/*Lista de paginas*/}
            {
                pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-red-400"}`} key={numberPage}>{numberPage}</li>)
            }
            {/* Pagina siguiente */}
            <li onClick={handleClickNextPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">"}</li>

            {/* Ultima pagina */}
            <li onClick={() => setCurrentPage(lastPage)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">>"}</li>
        </ul>

        {/* Seccion lista de pokemons */}
        <section className="px-2 grid gap-6 grid-cols-2 md:grid-cols-3">
            {
                pokemonInPage.map(pokemon =><PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            }
        </section>
    </section>
  )
}

export default Pokedex