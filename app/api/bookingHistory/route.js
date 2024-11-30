// api/bookingHistory/route.js
import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

import Booking from "@/lib/models/Booking";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email'); // Extract the category from the query string

    if (!email) {
        return NextResponse.json(
            { error: "email query parameter is missing" },
            { status: 400 }
        );
    } else {
    }
    console.log("email is founded")

    try {
        await connect();
        // Query where category.name matches the provided category
        const data = await Booking.find({ "email": email }).populate("businessList");


        // console.log(populatedData);

        if (!data || data.length === 0) {
            return NextResponse.json(
                { message: "No Booking found for this user" },
                { status: 404 }
            );
        }
        console.log(data)
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log(error)
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
