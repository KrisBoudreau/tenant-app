import mongoose from 'mongoose';

const BuildingSchema = mongoose.Schema({
    name: String,
    creator: String,
    insurance_email: String
})

var Building = mongoose.model('Building', BuildingSchema);

export default Building;