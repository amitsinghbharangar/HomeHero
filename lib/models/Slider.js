"use server"
import mongoose from 'mongoose';

// Debugging logs to check cached models
console.log('Existing Models:', mongoose.models);

const SliderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: {
        url: { type: String, required: true },
    },
});

// Check if the model is already defined, and use it if it exists
const Slider = mongoose.models.Slider || mongoose.model('Slider', SliderSchema);

export default Slider;


