import express from 'express';
import mongoose from 'mongoose';

import User from '../models/User.js';
import UniqueId from '../models/UniqueId.js';

const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const Users = await User.find();    
        res.status(200).json(Users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserByEmail = async (req, res) => { 
    try {
        const Userwid = await User.find( {email: req.params.id} );   
        res.status(200).json(Userwid);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getUser = async (req, res) => { 
    try {
        const Userwid = await User.find( {_id: req.params.id} );   
        res.status(200).json(Userwid);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => { 
    const { name, email, role } = req.body;

    try {
        const curUniqueId = await UniqueId.findOne(); 

        const id = curUniqueId.user;

        const newUniqueId = new UniqueId({ user: id+1, building: curUniqueId.building });
        await UniqueId.deleteOne();
        await newUniqueId.save(); 
                
        const newUser = new User({ name, email, role, id });

        await newUser.save();
        res.status(201).json('success');

    } catch (error) {
        res.status(411).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => { 
    const { name, role, email } = req.body;
    try {
        await User.findByIdAndUpdate(req.params.id, { name, role, email });
        res.status(201).json('success');
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => { 
    try {
        await User.deleteOne({_id: req.params.id});
        res.status(201);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUniqueUserId = async (req, res) => { 
    try {
        const id = await UniqueId.find();
        res.status(200).json(id);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const incrementUniqueUserId = async (req, res) => { 

    const curUniqueId = await UniqueId.findOne();
    try {
        const newUniqueId = new UniqueId({ user: curUniqueId.user+1, building:curUniqueId.building });
        await UniqueId.deleteOne();
        await newUniqueId.save();
        res.status(201).json('done');
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



