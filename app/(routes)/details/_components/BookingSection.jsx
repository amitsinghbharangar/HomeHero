import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from 'next-auth/react';
import handlePayment from "@/lib/payment"
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

    const { data } = useSession();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const payment = async () => {
        const bookingData = {
            ...formData, date: moment(date).format('DD-MMM-yyyy'), businessList: business._id, email: data.user.email, amount: business.bookingAmount
        };
        try {
            const res = await handlePayment(bookingData);

            if (!res.isOk) {
                throw new Error("Payment failed or no order ID returned");
            }
            // console.log("Payment successful, order ID:", order.id);
        } catch (error) {
            console.error("Payment Failed:", error);

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
                <div className='flex gap-5 mt-5'>
                    <Button variant="destructive"
                        className="">Cancel</Button>

                    <Button
                        disabled={!(formData.name && formData.address && formData.houseNo && formData.phone && date)}
                        onClick={() => payment()}
                    >
                        Pay and book</Button>
                </div>

                <SheetFooter className="mt-5">
                    <SheetClose asChild>


                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>


    )
}

export default BookingSection