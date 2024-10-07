import express from 'express';
import {createListing, deleteListing , updateListing} from "../controllers/listing.controller.js";
import {verifyUser} from "../utiles/verifyUser.js";

const router = express.Router();

router.post('/create',verifyUser , createListing)
router.delete('/delete/:id',verifyUser , deleteListing)
router.post('/update/:id',verifyUser , updateListing)


export default router;