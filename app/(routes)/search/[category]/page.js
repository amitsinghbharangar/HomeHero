"use client";


import React, { useEffect, useState } from 'react';
import BusinessList from '@/app/_components/BusinessList';
import { useParams } from 'next/navigation';
function BusinessByCategory() {
    // const searchParams = useSearchParams();
    // const category = searchParams.get('category'); // Retrieves the "category" query param
    const [businessList, setBusinessList] = useState([]);
    const params = useParams();
    // params.split('/')[2];

    useEffect(() => {
        // console.log(params); // Debugging params
        if (params?.category) {
            getBusinessList();
        }
    }, [params]);

    const getBusinessList = async () => {
        try {
            const result = await fetch(`/api/businessbycategory?category=${params.category}`);
            const data = await result.json();
            console.log(data)
            setBusinessList(data.data || []);
        } catch (error) {
            console.error('Failed to fetch business list:', error);
        }
    };

    return (
        <div>
            <BusinessList
                title={params.category}
                businessList={businessList}
            />
        </div>
    );
}

export default BusinessByCategory;
