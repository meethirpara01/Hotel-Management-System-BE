import { body, validationResult } from "express-validator"

export function validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        });
    }

    next();
}

export const addRoomValidator = [
    body('roomNumber')
        .notEmpty().withMessage('Room Number is required'),

    body('roomType')
        .notEmpty().withMessage('Room Type is required'),

    body('capacity')
        .notEmpty().withMessage('Room Type is required'),
        
    body('status')
        .notEmpty().withMessage('Room Type is required'),

    validate
]