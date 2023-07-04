import mongoose from 'mongoose';

const UniqueIdSchema = mongoose.Schema({
    user: Number,
    building: Number, 
})

var UniqueId = mongoose.model('UniqueId', UniqueIdSchema);

export default UniqueId;