import express from 'express';
import mongoose from 'mongoose';

import Building from '../models/Building.js';
import Unit from '../models/Unit.js';
import Lease from '../models/Lease.js';
import Email from '../models/Email.js'

const router = express.Router();


export const getBuildings = async (req, res) => { 
    try {
        const Buildings = await Building.find();    
        res.status(200).json(Buildings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getBuilding = async (req, res) => { 
    try {
        const theBuilding = await Building.find({_id: req.params.building_id});    
        res.status(200).json(theBuilding);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUnits = async (req, res) => { 
    try {
        const Units = await Unit.find({building_id: req.params.building_id});    
        res.status(200).json(Units);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getUnit = async (req, res) => { 
    try {
        const theUnit = await Unit.find({
            _id: req.params.unit_id,
            building_id: req.params.building_id});    
        res.status(200).json(theUnit);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLeases = async (req, res) => { 
    try {
        const Leases = await Lease.find({
            building_id: req.params.building_id,
            unit_id: req.params.unit_id,});    
        res.status(200).json(Leases);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLease = async (req, res) => { 
    try {
        const theLease = await Lease.find({
            _id: req.params.lease_id,
            unit_id: req.params.unit_id,
            building_id: req.params.building_id});    
        res.status(200).json(theLease);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getEmails = async (req, res) => { 
    try {
        const Emails = await Email.find({building_id: req.params.building_id});    
        res.status(200).json(Emails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getEmail = async (req, res) => { 
    try {
        const theEmail = await Email.find({_id: req.params.mail_id});    
        res.status(200).json(theEmail);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createEmail = async (req, res) => { 
    const { title, subject, body, send_instructions } = req.body;
    const building_id = req.params.building_id;   
    const newEmail = new Email({ title, subject, body, building_id, send_instructions });
    try {
        await newEmail.save();
        res.status(201).json('success');
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteEmail = async (req, res) => { 
    try {
        await Email.deleteOne( {_id: req.params.mail_id} );    
        res.status(200).json('success');
    } catch (error) {
        res.status(404).json({ message: error.message });   
    }
}


export const createBuilding = async (req, res) => { 
    const { name, creator, insurance_email } = req.body;   
    const newBuilding = new Building({ name, creator, insurance_email });
    try {
        await newBuilding.save();
        res.status(201);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const deleteBuilding = async (req, res) => { 
    try {
        await Building.deleteOne( {_id: req.params.building_id} );    
        res.status(200);
    } catch (error) {
        res.status(404).json({ message: error.message });   
    }
}

export const createUnit = async (req, res) => { 
    const { 
        unit_number, 
        creator, 
        building_id,
        tenant_name,
        type,
        size,
        price_per_sqft,
        vacant,
        base_rate,
        end_of_insurance,
        end_of_lease } = req.body;   
    const newUnit = new Unit({ 
        unit_number, 
        creator, 
        building_id,
        tenant_name,
        type,
        size,
        price_per_sqft,
        vacant,
        base_rate,
        end_of_insurance,
        end_of_lease });
    
    try {
        await newUnit.save();
        Unit.findOne({unit_number: unit_number})
        .then(u => {
            const unit_id = u._id;
            const blankLease = new Lease({ 
                unit_id,
                building_id,
            });
            blankLease.save();
        })

        res.status(201);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateUnit = async (req, res) => { 
    const { 
        unit_number,  
        tenant_name,
        type,
        size,
        price_per_sqft,
        vacant,
        base_rate,
        end_of_insurance,
        end_of_lease } = req.body;   
    try {
        await Unit.findByIdAndUpdate(req.params.id, {
            unit_number, 
            tenant_name,
            type,
            size,
            price_per_sqft,
            vacant,
            base_rate,
            end_of_insurance,
            end_of_lease});
        
        
        res.status(201).json('success');
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateLease = async (req, res) => { 
    const { 
        tenant_name,
        tenant_phone,
        tenant_email,
        start_date,
        end_date } = req.body;   
    try {
        await Lease.findByIdAndUpdate(req.params.id, {
            tenant_name,
            tenant_phone,
            tenant_email,
            start_date,
            end_date});
        
        
        res.status(201).json('success');
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const deleteUnit = async (req, res) => { 
    try {
        await Unit.deleteOne( {
            _id: req.params.unit_id, 
            building_id: req.params.building_id});    
        res.status(200);
    } catch (error) {
        res.status(404).json({ message: error.message });   
    }
}

export const createLease = async (req, res) => { 
    const { 
        tenant_name,
        tenant_phone,
        tenant_email,
        storage,
        start_date,
        end_date,
        building_id,
        unit_id,
        creator} = req.body;   
    const newLease = new Lease({ 
        tenant_name,
        tenant_phone,
        tenant_email,
        storage,
        start_date,
        end_date,
        building_id,
        unit_id,
        creator });
    try {
        await newLease.save();
        res.status(201);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const deleteLease = async (req, res) => { 
    try {
        await Lease.deleteOne( {_id: req.params.lease_id });    
        res.status(200);
    } catch (error) {
        res.status(404).json({ message: error.message });   
    }
}

export const getLeaseById = async (req, res) => { 
    try {
        const theLease = await Lease.find({
            _id: req.params.id});    
        res.status(200).json(theLease);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




