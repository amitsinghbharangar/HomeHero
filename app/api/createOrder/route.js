import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay client
const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_ID
});

export async function POST(req) {
    try {
        const { amount } = await req.json();
        // Validate amount
        if (!amount || isNaN(amount) || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Convert to paise
            currency: "INR",
            receipt: `order_${Date.now()}`,
            payment_capture: 1
        });

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);

        return NextResponse.json(
            { error: error.message || "Order creation failed" },
            { status: 500 }
        );
    }
}