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
        // <div className="my-10 mx-5 md:mx-36">
        //     <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
        //     <Tabs defaultValue="booked" className="w-full">
        //         <TabsList className="w-full justify-start">
        //             <TabsTrigger value="booked">Booked</TabsTrigger>
        //             <TabsTrigger value="completed">Completed</TabsTrigger>
        //         </TabsList>
        //         <TabsContent value="booked">
        //             <BookingHistoryList bookingHistory={bookingHistory} />
        //         </TabsContent>
        //         <TabsContent value="completed">
        //             <BookingHistoryList bookingHistory={bookingHistory} />
        //         </TabsContent>
        //     </Tabs>
        // </div>
    );
}

export default MyBooking;
