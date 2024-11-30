// "use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
// import { useEffect, useState } from 'react';

function Hero() {

  return (
      
      <div className='flex items-center flex-col  pb-0'>
        <h2 className='font-bold text-[46px] text-center'>Find Home
          <span className='text-purple-600'> Service/Repair</span> <br /> Near You</h2>
        <h2 className='text-xl text-gray-400'>Explore Best Home Services & Repair Near You</h2>
        <div className='mt-4 flex gap-3 items-center '>
          <Input placeholder='Search' className='rounded-full md:w-[350px]' />
          <Button className='rounded-full h-[40px]'>
            <Search className='w-4 h-5' />
          </Button>
        </div>
      </div>
    
   
  )
}

export default Hero
