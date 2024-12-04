"use client"
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth';
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
    <div className='p-3 shadow-sm flex  justify-between'>
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
