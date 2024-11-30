
import {connect} from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Slider from "@/lib/models/Slider";

export async function GET() {
    try {
        await connect();
        console.log("db connected succesfully")
        const data = await Slider.find({});
        if (!data || data.length === 0) {
            console.log("No data found in the collection.");
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data from slider" }, { status: 500 });
    }
}


// export async function fetchData() {
//     let res = await fetch('/api/getData', {
    //         cache: "no-store", // Ensures data is fresh on each request, similar to `getServerSideProps`
    //     });
    
    
    //     if (!res.ok) {
//         throw new Error("Failed to fetch data");
//     }

//     const data = await res.json();
//     return data
// }
// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from 'next/server';
// export  async function getSlider() {
//     try{
//         const client = await clientPromise;
//         const db = client.db("Categories");
//         const data = await db.collection("sliders").find({}).toArray();
//         return NextResponse.json({ data: data }, { status: 200 });

//     } catch (error) {
//         console.error('Error fetching data from MongoDB', error);
//         return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//     }
// }

// export  async function getBusinesslist(){
//     try {
//         const client = await clientPromise;
//         const db = client.db("Categories");
//         const data = await db.collection("businesslists").find({}).toArray();
//         return NextResponse.json({ data: data }, { status: 200 });

//     } catch (error) {
//         console.error('Error fetching data from MongoDB', error);
//         return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//     }
// }