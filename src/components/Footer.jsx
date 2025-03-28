import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto px-6 flex justify-center items-center">
        <p className="text-center">
          © {new Date().getFullYear()} Hassan Rajput | All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer