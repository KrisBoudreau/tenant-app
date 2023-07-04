import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    role: String, 
    id: Number
})

var User = mongoose.model('User', UserSchema);

export default User;