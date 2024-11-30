<<<<<<< HEAD
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
=======
"use client"
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

function Header() {

  const { data } = useSession();

  return (
    <div className='p-3 shadow-sm flex  justify-between
    '>
      <div className='flex items-center gap-8 mx-8'>
        <Image src='/logo.svg' alt='logo'
          width={180} height={100} />
        <div className='md:flex items-center
            gap-6 hidden
            '>
          <Link href={'/'} className='hover:scale-105 hover:text-primary
                cursor-pointer'>Home</Link>
          <h2 className='hover:scale-105 hover:text-primary
                cursor-pointer'>Services</h2>
          <h2 className='hover:scale-105 hover:text-primary
                cursor-pointer'>About Us</h2>

        </div>

      </div>
      <div>
        {data?.user ?

          <DropdownMenu>
            <DropdownMenuTrigger asChild >
              <Image src='/user.jpg'
                alt='user'
                width={40}
                height={40}
                className='rounded-full'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white rounded-md shadow-lg">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-gray-700">
                <Link href={'/mybooking'}>My Booking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700" onClick={() => signOut()}>Logout</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

          :
          <Link href={'/login'} ><Button className='bg-purple-500 rounded hover:bg-purple-600'>Login / Sign Up</Button></Link>


        }
      </div>
    </div>
  )
}

export default Header
>>>>>>> dd26452 (project completed)
