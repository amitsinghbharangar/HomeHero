import { connect } from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";
import { NextResponse } from "next/server";
export async function POST(request) {
    await connect();
    try {
        const { email, name, bookingStatus, businessList, date, phone, address, houseNo, orderId, amount } = await request.json();
        const newBooking = new Booking({ email, name, bookingStatus, businessList, date, phone, address, houseNo, orderId, amount });
        await newBooking.save()
        return NextResponse.json({
            message: "Booking created successfully",
        });
    } catch (e) {
        console.log({ e });
        return NextResponse.json({
            success: false,
            message: "Error Booking slot",
        });
    }

}