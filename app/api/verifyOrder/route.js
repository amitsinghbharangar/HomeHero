import crypto from 'crypto';
import { NextResponse } from 'next/server';


const generateSignature = (razorpayOrderId, razorpayPaymentId) => {
    // Retrieve Razorpay secret key from environment variables
    const keySecret = process.env.RAZORPAY_SECRET_ID;

    // Validate secret key is present
    if (!keySecret) {
        throw new Error('Razorpay secret key is not configured');
    }

    // Generate HMAC-SHA256 signature
    const sig = crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");

    return sig;
};

export async function POST(req) {
    try {

        const { orderId, razorpayPaymentId, razorpaySignature } = await req.json();

        // Validate input parameters
        if (!orderId || !razorpayPaymentId || !razorpaySignature) {
            return NextResponse.json({ message: "Missing required payment verification parameters", isOk: false }, { status: 400 })

        }

        // Generate signature for verification
        const generatedSignature = generateSignature(orderId, razorpayPaymentId);

        // Compare signatures
        if (generatedSignature !== razorpaySignature) {
            console.error('Payment verification failed', {
                expectedSignature: generatedSignature,
                receivedSignature: razorpaySignature
            });
            return NextResponse.json({ message: "Payment verification failed", isOk: false }, { status: 400 })

        }
        // Additional verification steps (recommended)
        // 1. Verify order amount matches expected amount in your database
        // 2. Check order status
        // 3. Ensure order hasn't been already processed

        // Optional: Retrieve and verify order details from your database
        // const orderDetails = await findOrderById(orderId);
        // if (orderDetails.amount !== expectedAmount) {
        //     return res.status(400).json({ 
        //         message: "Order amount mismatch", 
        //         isOk: false 
        //     });
        // }

        // Payment verification successful
        return NextResponse.json({ message: "Payment verified successfully", isOk: true }, { status: 200 })


    } catch (error) {
        // Log the full error for debugging
        console.error('Payment verification error:', error);

        // Return a generic error response
        return NextResponse.json({ message: "Internal server error during payment verification", isOk: false }, { status: 500 })

    }
}

// Export the verification function

// Example usage in an Express or Next.js API route
// module.exports = async function handler(req, res) {
//     await verifyPayment(req, res);
// }


// import crypto from 'crypto'
// import { NextResponse } from 'next/server';

// const generatedSignature = (razorpayOrderId, razorpaypaymentId) => {
//     const keySecret = process.env.RAZORPAY_SECRET_ID;

//     const sig = crypto
//         .createHmac("sha256", keySecret)
//         .update(razorpayOrderId + "|" + razorpaypaymentId)
//         .digest("hex");
//     return sig;
// };

// export async function POST(response) {
//     const { orderId, razorpaypaymentId, razorpaySignature } = await response.json();

//     const signature = generatedSignature(orderId, razorpaypaymentId);
//     if (signature !== razorpaySignature) {

//         return NextResponse.json({ message: "payment verification failed", isOk: false }, { status: 400 })
//     }

//     return NextResponse.json({ message: "Payment verified successfully", isOk: true }, { status: 200 })
// }