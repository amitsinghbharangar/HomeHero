"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react'

function CategorySideBar() {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const params = usePathname();
    params.split('/')[2];
    useEffect(() => {

        getCategoryList();
    }, [])

    useEffect(() => {
        params && setSelectedCategory(params.split('/')[2])
    }, [params])

    /**
     * Used to get All Category List
     */
    const getCategoryList = async () => {
        try {
            const result = await fetch('/api/sliders');
            const data = await result.json();
            setCategoryList(data.data);
        } catch (error) {
            console.error('Failed to fetch category list:', error);
        }
    };

    return (
        <div className=' ml-5' >
            <h2 className='font-bold mb-3 text-lg text-primary '>Categories</h2>
            <div>
                {categoryList.map((category, index) => (
                    <Link href={'/search/' + category.name}
                        key={index} className={`flex gap-2 p-3 
                border rounded mb-2
                md:mr-10 cursor-pointer
                hover:bg-purple-50
                hover:shadow-md
                items-center
                hover:text-purple-800
                 hover:border-purple-800
                 ${selectedCategory == category.name &&
                            'border-primary text-purple-700 shadow-lg bg-purple-50 scale-105 transition-all ease-in-out'}
                 `}>
                        <Image src={category.img.url}
                            alt='icon'
                            width={25}
                            height={25} />
                        <h2>{category.name}</h2>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default CategorySideBar