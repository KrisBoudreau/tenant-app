import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import Profile from '../../components/Profile';

export default function Client( {curUser} ) {
  return (
    <Routes>
      <Route path="/" element={<Home {...{curUser}} />} />
      <Route path="/profile" element={<Profile {...{curUser}} />} />
      
    </Routes>
  )
}
