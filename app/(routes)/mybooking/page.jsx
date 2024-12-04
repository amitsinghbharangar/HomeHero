"use client"
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_component/BookingHistoryList";
import { useSession } from "next-auth/react";


function MyBooking() {
    const { data } = useSession();
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        if (data) GetUserBookingHistory();
    }, [data]);

    const GetUserBookingHistory = async () => {
        try {
            const res = await fetch(`/api/bookingHistory?email=${data.user.email}`);

            const response = await res.json();

            setBookingHistory(response.data);
            console.log(bookingHistory)

        } catch (error) {
            console.error("Error fetching booking history:", error);
        }
    };

    return (
        <div className="my-5 mx-5 md:mx-15">

            <BookingHistoryList bookingHistory={bookingHistory} />
        </div>

    );
}

export default MyBooking;
