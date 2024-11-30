"use client"

import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import BusinessInfo from '../_components/BusinessInfo';
import SuggestedBusinessList from '../_components/SuggestedBusinessList';
import BusinessDescription from '../_components/BusinessDescription';

function BusinessDetail() {

    const { data, status } = useSession();
    const [business, setBusiness] = useState([]);
    const params = useParams();
    useEffect(() => {
        console.log(params)
        params && getbusinessById();
    }, [params]);

    useEffect(() => {
        checkUserAuth();
    }, []);

    const getbusinessById = async () => {
        const result = await fetch(`/api/businessbyid?_id=${params.businessId}`);
        const data = await result.json();

        setBusiness(data.data);
    }

    const checkUserAuth = () => {
        if (status == 'loading') {
            return <p>Loading...</p>
        }

        if (status == 'unauthenticated') {
            signIn();
        }

    }
    return status == 'authenticated' && (

        <div className='py-2 md:py-5
        px-10 md:px-10'>
            <BusinessInfo business={business} />

            <div className='grid grid-cols-3 mt-16'>
                <div className='col-span-3 md:col-span-2 order-last md:order-first'>
                    <BusinessDescription business={business} />
                </div>
                <div className=''>
                    <SuggestedBusinessList business={business} />
                </div>
            </div>

        </div>
    )
}

export default BusinessDetail