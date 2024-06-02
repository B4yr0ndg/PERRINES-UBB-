/* import dogSchema from "../schemas/dog.schema.js";

// eslint-disable-next-line require-jsdoc
const validateDog = (req, res, next) => {
    const { error } = dogSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export default validateDog;
*/ 

