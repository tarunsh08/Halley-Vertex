import React from 'react'

const Home = () => {
  return (
    <div className='bg-[url("https://plus.unsplash.com/premium_photo-1686064771021-fbd6e301a0e4?q=80&w=893&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center min-h-screen'>
      <div className="text-center text-6xl md:text-8xl font-extrabold py-10
            text-transparent bg-clip-text 
            bg-gradient-to-r from-neutral-200 via-gray-400 to-neutral-600 
            drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
        What should we <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x">build</span> today?
      </div>
      <div className='m-4 flex justify-center items-center relative bottom-0'>
        <form className='flex flex-col w-1/3 py-16'>
          <textarea name="" id="" cols="30" rows="5" placeholder='Enter your task description here...' className='m-2 p-4 rounded-xl resize-none bg-[#000000c4] border border-neutral-600 text-white overflow-hidden outline-none'></textarea>
          <button type='submit' className='px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors duration-300 rounded self-center cursor-pointer'>Generate</button>
        </form>
      </div>
    </div>
  )
}

export default Home