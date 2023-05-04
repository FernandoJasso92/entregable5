import React from 'react'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
        {/*Parte superior*/}
        <section>
            <article className='grid justify-center py-10 gap-8'>
                <div>
                    <img src="/images/pokedex.png" alt="" />
                </div>
                <h2 className='font-bold text-[50px] text-red-500 text-center'>¡Hello trainer!</h2>
                <p className='font-bold text-[25px] text-center text-gray-600'>Give me your name to start:</p>
                <form className='flex justify-center' onSubmit={handleSubmit}>
                    <input className='border-2' id="nameTrainer" type="text" placeholder='Your name ...'/>
                    <button className='font-bold border-2  bg-red-500 text-white w-[80px]'>Start</button>
                </form>
            </article>
        </section>

        {/* Footer */}
        <Footer />
    </section>
  )
}

export default Home     