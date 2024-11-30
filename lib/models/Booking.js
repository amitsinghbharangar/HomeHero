// models/Booking.js
import mongoose from 'mongoose';
import Businesslist from './Businesslist';
// Define Booking Status Enum
const bookingStatusEnum = ['Booked', 'Pending', 'Cancelled'];

const BookingSchema = new mongoose.Schema(
    {
        bookingStatus: {
            type: String,
            enum: bookingStatusEnum,
            default: 'Booked', // Default status
            required: true,
        },
        businessList: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Business collection
            ref: Businesslist, // Collection name
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        email: {
            type: String,
            required: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'], // Validation for a 10-digit phone number
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        houseNo: {
            type: String, // Can be string in case of alphanumeric house numbers

        },

    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);


const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking;