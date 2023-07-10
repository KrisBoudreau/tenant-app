import mongoose from 'mongoose';

const EmailSchema = mongoose.Schema({
    title: String,
    subject: String,
    body: String,
    building_id: String
})

    var Email = mongoose.model('Email', EmailSchema);

export default Email;