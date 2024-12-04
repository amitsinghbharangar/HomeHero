import { connect } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connect();
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email or password missing" }, { status: 400 });
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        return NextResponse.json({ messsage: 'user registered successfully' }, { status: 200 })
    } catch (e) {
        console.error("Error during user registration:", e);

        if (e.code === 11000) { // Handle duplicate key error
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}