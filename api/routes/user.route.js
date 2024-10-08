import express from 'express';
import {deleteUser, test, updateUser, getUserListings, getUser} from '../controllers/user.controller.js';
import {verifyUser} from "../utiles/verifyUser.js";
const router = express.Router();



router.get('/test', test)
router.post('/update/:id', verifyUser, updateUser)
router.delete('/delete/:id', verifyUser, deleteUser)
router.get('/listings/:id', verifyUser, getUserListings)
router.get('/:id', verifyUser, getUser)



export default router;