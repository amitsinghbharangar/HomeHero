import { Button } from '@/components/ui/button'
import { Clock, IndianRupee, Mail, MapPin, Share, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function BusinessInfo({ business }) {
    const data = business?.[0];
    return data?.name && (
        <div className='md:flex gap-4 items-center'>
            <img src='https://images.pexels.com/photos/29482576/pexels-photo-29482576/free-photo-of-vibrant-rainbow-lorikeets-perched-on-tree-branch.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
                alt={data.name}
                width={150}
                height={200}
                className='rounded-full h-[150px]
        object-cover'
            />
            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col mt-4 md:mt-0 items-baseline gap-3'>
                    <h2 className='text-purple-800 p-1 px-3
        text-lg 
        bg-purple-100 rounded-full'>{data?.category?.name}</h2>
                    <h2 className='text-[40px] font-bold'>{data.name}</h2>

                    <h2 className='flex gap-2 text-lg text-gray-500'>
                        <Mail />
                        {data?.email}</h2>
                    <h2 className='flex gap-2 text-lg text-primary'>
                        <IndianRupee />
                        {data?.bookingAmount}</h2>
                </div>
                <div className='flex flex-col gap-5 items-end'>
                    <Button><Share /></Button>
                    <h2 className='flex gap-2 text-xl text-purple-800'><User /> {data.contactPerson} </h2>
                    <h2 className='flex gap-2 text-xl text-gray-500'><Clock /> Available 8:00 AM to 10:PM </h2>

                </div>
            </div>
        </div>
    )
}

export default BusinessInfo