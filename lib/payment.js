import { toast } from '@/hooks/use-toast';
import { NextResponse } from 'next/server';
import { useEffect } from 'react';
const saveBooking = async (bookingData) => {
    console.log(bookingData);
    try {
        const response = await fetch("/api/createBooking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData)
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        console.log("service booked successfully")
        toast({
            title: "Service booked successfully.",
            description: "You will be redirected to the dashboard.",
        });
        console.log(response);

        window.location.href = "/mybooking";



    } catch (error) {
        console.error("Booking Failed:", error);

        toast({
            variant: "destructive",
            className: 'bg-white',
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
        });
    }



}
const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
        // Check if Razorpay is already loaded
        if (typeof window !== 'undefined' && window.Razorpay) {
            resolve(window.Razorpay);
            return;
        }

        // Ensure we're in a browser environment
        if (typeof window === 'undefined') {
            reject(new Error('Cannot load Razorpay script in non-browser environment'));
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
            // Give a slight delay to ensure Razorpay is fully loaded
            setTimeout(() => {
                if (window.Razorpay) {
                    resolve(window.Razorpay);
                } else {
                    reject(new Error('Razorpay object not found after script load'));
                }
            }, 100);
        };

        script.onerror = () => {
            reject(new Error('Failed to load Razorpay script'));
        };

        document.body.appendChild(script);
    });
};

const handlePayment = async (bookingData) => {
    try {
        // Dynamically load Razorpay script
        await loadRazorpayScript();

        // Verify that Razorpay is available
        if (!window.Razorpay) {
            throw new Error('Razorpay is not loaded');
        }

        // Create order on the server

        const response = await fetch('/api/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: parseFloat(bookingData.amount) })
        });

        const order = await response.json();

        if (!order.id) {
            throw new Error('Order creation failed');
        } else {
            console.log("order created successfully");
        }

        // Razorpay payment options
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "HomeHero",
            description: "Transaction",
            order_id: order.id,
            handler: async function (response) {
                // Handle successful payment
                alert('Payment Successful!');


                // You can send payment verification request to your server here
                const verifyResponse = await fetch('/api/verifyOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature
                    })
                });

                const verificationResult = await verifyResponse.json();
                if (verificationResult.isOk) {
                    await saveBooking({ ...bookingData, orderId: order.id });
                }

            },
            prefill: {
                name: bookingData.name,
                email: bookingData.email,
                contact: bookingData.phone
            },
            notes: {
                address: "Mathura, Uttar Pradesh"
            },
            theme: {
                color: "#3399cc"
            }
        };

        // Create Razorpay instance and open payment window

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        return { order, isOk: true };

    } catch (error) {
        return NextResponse.json({ message: error, isOk: false }, { status: 400 });
    }
};

export default handlePayment;

// Optional: React Hook for managing Razorpay script loading
export const useRazorpay = () => {
    useEffect(() => {
        const loadScript = async () => {
            try {
                await loadRazorpayScript();
            } catch (error) {
                console.error('Failed to load Razorpay script:', error);
            }
        };

        loadScript();
    }, []);
};