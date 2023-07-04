import mongoose from 'mongoose';

const LeaseSchema = mongoose.Schema({
    tenant_name: String,
    tenant_phone: Number,
    tenant_email: String,
    storage: Boolean,
    start_date: String,
    end_date: String,
    building_id: String,
    unit_id: String,
    creator: String
})

var Lease = mongoose.model('Lease', LeaseSchema);

export default Lease;