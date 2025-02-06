const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    payment: { type: Number, required: true },
    description: { type: String, required: true },
    datePosted: { type: Date, required: true },
    time: { type: String, required: true },
    user: { type: Object, required: true },
    location: {
        type: { type: String, default: 'Point' }, // GeoJSON Point type
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
            index: '2dsphere' // Create a geospatial index

        }
    }
});

// Create a geospatial index
jobSchema.index({ location: '2dsphere' });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
