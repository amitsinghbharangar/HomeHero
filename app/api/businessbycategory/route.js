import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Businesslist from "@/lib/models/Businesslist";

// GET API handler
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category'); // Extract the category from the query string
    console.log(category)
    if (!category) {
        return NextResponse.json(
            { error: "Category query parameter is missing" },
            { status: 400 }
        );
    }

    try {
        await connect();
        // Query where category.name matches the provided category
        const data = await Businesslist.find({ "category.name": category });

        if (!data || data.length === 0) {
            return NextResponse.json(
                { message: "No businesses found for the given category" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
