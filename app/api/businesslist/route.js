import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

import Businesslist from "@/lib/models/Businesslist";

export async function GET() {
    try {
        await connect();
        const data = await Businesslist.find({});
        if (!data || data.length === 0) {
            console.log("No data found in the collection.");
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}