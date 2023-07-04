import express from 'express';

import { 
    getBuildings, 
    getBuilding,
    getUnits,
    getUnit,
    getLeases,
    getLease,
    createBuilding, 
    deleteBuilding,
    createUnit,
    deleteUnit,
    createLease,
    deleteLease,
    updateUnit,
    updateLease } 
    from '../controllers/Buildings.js';


const router = express.Router();


router.get('/', getBuildings);
router.get('/:building_id', getBuilding);
router.get('/:building_id/units', getUnits);
router.get('/:building_id/units/:unit_id', getUnit);
router.get('/:building_id/units/:unit_id/leases', getLeases);
router.get('/:building_id/units/:unit_id/leases/:lease_id', getLease);




router.post('/', createBuilding);
router.delete('/:building_id', deleteBuilding);


router.post('/:building_id/units', createUnit);
router.post('/:building_id/units/:id', updateUnit);
router.delete('/:building_id/units/:unit_id', deleteUnit);


router.post('/:building_id/units/:unit_id/leases', createLease);
router.post('/:building_id/units/:unit_id/leases/:id', updateLease);
router.delete('/:building_id/units/:unit_id/leases/:lease_id', deleteLease);









export default router;