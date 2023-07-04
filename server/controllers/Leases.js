import express from 'express';
import mongoose from 'mongoose';

import Lease from '../models/Lease.js';

const router = express.Router();



export const getLeaseByEmail = async (req, res) => { 
    try {
        const leases = await Lease.find({
            tenant_email: req.params.email});    
        res.status(200).json(leases);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLeases = async (req, res) => { 
    try {
        const leases = await Lease.find();    
        res.status(200).json(leases);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getLeaseById = async (req, res) => { 
    try {
        const lease = await Lease.find({
            _id: req.pareams.id});    
        res.status(200).json(lease);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}