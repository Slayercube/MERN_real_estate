import Listing from "../models/listing.model.js";
import {errorHandler} from "../utiles/error.js";


export const createListing = async (req, res, next)  => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}
// api/controllers/listing.controller.js
export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }
        if (req.user._id.toString() !== listing.userRef.toString()) {
            return next(errorHandler(403, 'You are not authorized to delete this listing'));
        }
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        next(error);
    }
};


export const updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }
        if (req.user._id.toString() !== listing.userRef.toString()) {
            return next(errorHandler(403, 'You are not authorized to update this listing'));
        }
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
       const limit = parseInt(req.query.limit) || 9;
         const StartIndex = parseInt(req.query.skip) || 0;
         let offer = req.query.offer

         if (offer === undefined  || offer === "false") {
             offer = {$in: [false, true]};
         }

         let furnished = req.query.furnished;
            if (furnished === undefined || furnished === "false") {
                furnished = {$in: [false, true]};
            }

            let parking = req.query.parking;
            if (parking === undefined  || parking === "false") {
                parking = {$in: [false, true]};
            }
          let type = req.query.type;
            if (type === undefined || type === "all") {
                type = {$in: ["sale", "rent"]};
            }

            const searchTerm = req.query.search || '';

            const sort = req.query.sort || 'createdAt';

            const order = req.query.order || 'desc';

            const listings = await Listing.find({
               name: {$regex: searchTerm, $options: 'i'},
                offer,
                furnished,
                parking,
                type
            }).sort({[sort]: order}).limit(limit).skip(StartIndex);

            return res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
}