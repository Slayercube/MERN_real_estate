import {errorHandler} from "../utiles/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";


export const test = (req, res, ) => {
    res.send('Hello World !! Api route is working');
}

export const updateUser = async (req, res, next) => {
    console.log(`Authenticated user ID: ${req.user._id}`);
    console.log(`User ID from params: ${req.params.id}`);

    if (req.user._id !== req.params.id) return next(errorHandler(403, "you can only update your account"));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, { new: true });
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
};



