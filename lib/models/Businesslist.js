"use server"
import mongoose from 'mongoose';

const BusinesslistSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        name: {
            type: String,
            required: true,
            trim: true
        }
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Invalid email format"]
    },
    images: [
        {
            url: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Businesslist = mongoose.models.Businesslist || mongoose.model('Businesslist', BusinesslistSchema);

export default Businesslist;
