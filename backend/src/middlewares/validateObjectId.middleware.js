import mongoose from "mongoose";

// eslint-disable-next-line require-jsdoc
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "ID no válido." });
    }
    next();
};

export default validateObjectId;
