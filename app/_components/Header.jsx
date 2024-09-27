import React from 'react'

const Header = () => {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </div>
          <div className="flex items-center lg:order-2">

            <div className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </div>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <div >
                  Home
                </div>
              </li>
              <li>
                <div className="">
                  About
                </div>
              </li>
              <li>
                <div>
                  Contact Us
                </div>
              </li>
              <li>
                <div>
                  Github
                </div>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header