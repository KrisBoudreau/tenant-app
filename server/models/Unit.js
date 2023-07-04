import mongoose from 'mongoose';

const UnitSchema = mongoose.Schema({
    unit_number: Number,
    tenant_name: String,
    type: String,
    size: Number,
    price_per_sqft: Number,
    vacant: Boolean,
    base_rate: Number,
    end_of_insurance: String,
    end_of_lease: String,
    building_id: String,
    creator: String,

})

var Unit = mongoose.model('Unit', UnitSchema);

export default Unit;