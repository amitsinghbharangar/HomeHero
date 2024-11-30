import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from 'next-auth/react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';

import moment from 'moment';
import { useToast } from "@/hooks/use-toast";

function BookingSection({ children, business }) {
    const { toast } = useToast();

    const [date, setDate] = useState(new Date());

    const [formData, setFormData] = useState({
        name: "",

        phone: "",
        address: "",
        houseNo: "",
    });
    const [selectedTime, setSelectedTime] = useState();
    const { data } = useSession();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    // useEffect(() => {
    //     date && BusinessBookedSlot();
    // }, [date])

    /**
     * Get Selected Date Business Booked Slot
     */
    // const BusinessBookedSlot = () => {
    //     GlobalApi.BusinessBookedSlot(business.id, moment(date).format('DD-MMM-yyyy'))
    //         .then(resp => {
    //             console.log(resp)
    //             setBookedSlot(resp.bookings)
    //         })
    // }

    const saveBooking = async () => {
        const bookingData = {
            ...formData, date: moment(date).format('DD-MMM-yyyy'), selectedTime, businessList: business._id, email: data.user.email
        };
        try {
            console.log(bookingData);
            const response = await fetch("/api/createBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("service booked successfully")
            toast({
                title: "Service booked successfully.",
                description: "You will be redirected to the dashboard.",
            });
            setFormData({
                name: "",
                phone: "",
                address: "",
                houseNo: "",
            });

            setDate();
            setSelectedTime('');

        } catch (error) {
            console.error("Booking Failed:", error);

            toast({
                variant: "destructive",
                className: 'bg-white',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Function to disable past dates
    const isDateDisabled = (date) => date <= today;

    return (
        <Sheet className="bg-white text-black p-2 shadow-lg rounded-lg">
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="overflow-auto  bg-white text-black p-5 shadow-lg rounded-md">
                <SheetHeader>
                    <SheetTitle>Book an Service</SheetTitle>
                    <SheetDescription>

                        {/* Date Picker  */}

                        <div className='flex flex-col gap-5 items-baseline'>
                            <h2 className='mt-2 font-bold'>Select Date</h2>

                            <Calendar className="rounded-xl border "
                                mode="single"
                                selected={date}
                                // Controlled component
                                onSelect={setDate} // Update selected date
                                disabled={isDateDisabled} // Disable past dates

                            />
                        </div>
                    </SheetDescription>
                </SheetHeader>


                <form className="mt-4 space-y-4">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="name">Name</Label>
                        <Input className="rounded"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="phone">Phone</Label>
                        <Input className="rounded"
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="address">City</Label>
                        <Input className="rounded"
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Enter your city"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="houseNo">House Number</Label>
                        <Input className="rounded"
                            id="houseNo"
                            name="houseNo"
                            type="text"
                            placeholder="Enter your house number"
                            value={formData.houseNo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </form>


                <SheetFooter className="mt-5">
                    <SheetClose asChild>
                        <div className='flex gap-5'>
                            <Button variant="destructive"
                                className="">Cancel</Button>

                            <Button
                                disabled={!({ ...formData } && date)}
                                onClick={() => saveBooking()}
                            >
                                Book</Button>
                        </div>

                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>


    )
}

export default BookingSection