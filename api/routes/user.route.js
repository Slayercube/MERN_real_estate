import express from 'express';
import {deleteUser, test, updateUser, getUserListings} from '../controllers/user.controller.js';
import {verifyUser} from "../utiles/verifyUser.js";
const router = express.Router();



router.get('/test', test)
router.post('/update/:id', verifyUser, updateUser)
router.delete('/delete/:id', verifyUser, deleteUser)
router.get('/listings/:id', verifyUser, getUserListings)



export default router;