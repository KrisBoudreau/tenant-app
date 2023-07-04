import express from 'express';

import { getUsers, createUser, getUser, getUserByEmail, deleteUser, updateUser} from '../controllers/Users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.get('/email/:id', getUserByEmail);
router.delete('/:id', deleteUser);
router.post('/update/:id', updateUser);





export default router;