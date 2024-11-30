import { Calendar, Clock, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import React from "react";

function BookingHistoryList({ bookingHistory }) {
    console.log(bookingHistory)
    // const cancelAppointment = (booking) => {
    //     GlobalApi.deleteBooking(booking.id).then(
    //         (resp) => {
    //             if (resp) {
    //                 toast("Booking Deleted Successfully!");
    //             }
    //         },
    //         (e) => {
    //             toast("Error while canceling booking!");
    //         }
    //     );
    // };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {bookingHistory?.map((booking, index) => (
                <div key={index} className="border rounded-xl p-4 mb-5">
                    <div className="flex gap-4">
                        {booking?.businessList?.name && (
                            <img
                                src="https://images.pexels.com/photos/7515082/pexels-photo-7515082.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="image"
                                width={120}
                                height={120}
                                className="rounded object-cover"
                            />
                        )}
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold">{booking.businessList.name}</h2>
                            <h2 className="flex gap-2 text-primary">
                                <User /> {booking.businessList.contactPerson}
                            </h2>
                            <h2 className="flex gap-2 text-gray-500">
                                <MapPin className="text-primary" /> {booking.businessList.address}
                            </h2>
                            <h2 className="flex gap-2 text-gray-500">
                                <Calendar className="text-primary" />
                                Service on: <span className="text-black">{booking.date}</span>
                            </h2>

                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default BookingHistoryList;
