
import { Button } from '@/components/ui/button'
import { IndianRupee, NotebookPen } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

import BookingSection from './BookingSection';

function SuggestedBusinessList({ business }) {
    const data = business?.[0];

    const [businessList, setBusinessList] = useState([]);
    useEffect(() => {

        data && getBusinessList()
    }, [business]);

    const getBusinessList = async () => {
        try {
            const res = await fetch(`/api/businessbycategory?category=${data.category.name}`);
            const result = await res.json();
            setBusinessList(result.data || []);
        } catch (error) {
            console.error('Failed to fetch business list:', error);
        }
    }


    return (
        <div className='md:pl-10'>

            <BookingSection business={data}>
                <Button className="flex gap-2 w-full">
                    <NotebookPen />
                    Book Appointment
                </Button>
            </BookingSection>
            <div className='hidden md:block'>
                <h2 className='font-bold 
      text-lg mt-3 mb-3
      
      '>Similar Business</h2>
                <div className=''>
                    {businessList && businessList.map((business, index) => (
                        <Link href={'/details/' + business._id} key={business._id} className="flex gap-2 mb-4
                        
          hover:border rounded-xl 
          cursor-pointer hover:shadow-md
           border-purple-800">
                            <Image src={business?.images[0].url}
                                alt={business.name}
                                width={80}
                                height={80}
                                className='rounded-xl object-cover h-[100px]'
                            />
                            <div className=''>
                                <h2 className='font-bold'>{business.name}</h2>
                                <h2 className='text-purple-800'>{business.contactPerson}</h2>
                                <h2 className='text-gray-400 flex'><IndianRupee />{business.bookingAmount}</h2>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuggestedBusinessList