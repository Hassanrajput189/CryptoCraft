import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-green-800  mb-4'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className="logo font-bold text-2xl">
                    <span className='text-blue-500'> &lt;</span>

                    <span>Crypto</span><span className='text-blue-500'>Craft/&gt;</span>



                </div>

                {/* <button onClick={() => window.open('https://github.com/Hassanrajput189/.git')} className='text-white bg-purple-950  my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1  hover:text-xl hover:bg-purple-900'>
                    <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>
                </button> */}


            </div>
        </nav>
    )
}

export default Navbar