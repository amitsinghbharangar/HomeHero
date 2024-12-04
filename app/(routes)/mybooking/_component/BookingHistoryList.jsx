import { Calendar, MapPin, User, IndianRupee, PackageSearch } from "lucide-react";
import moment from "moment";
// import { toast } from "sonner";
import React from "react";

function BookingHistoryList({ bookingHistory }) {
    // console.log(bookingHistory)

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
                                Service on: <span className="text-black">{moment(booking.date).format('DD/MM/YYYY')}</span>
                            </h2>
                            <h2 className="flex gap-2 text-gray-500">
                                <IndianRupee className="text-primary" />
                                Booking Amount: <span className="text-black">{booking.amount}</span>
                            </h2>
                            <h2 className="flex gap-2 text-gray-500">
                                <PackageSearch className="text-primary" />
                                Order Id: <span className="text-black">{booking.orderId}</span>
                            </h2>

                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default BookingHistoryList;
