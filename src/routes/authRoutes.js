import { Router } from 'express';
import { forgotPassword, getUser, loginUser, logoutUser, register } from '../controllers/authController.js';
import multer from 'multer'
import path from 'path'
import { forgotPasswordValidator, loginValidator, registerValidator } from '../validators/authValidator.js';
import identifyUser from '../middlewares/authMiddleware.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/ProfilePic_images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });


const authRoute = Router();

authRoute.post('/register', upload.single('PROPIC'), registerValidator, register);

authRoute.post('/login', loginValidator, loginUser);

authRoute.post('/forgotPassword', forgotPasswordValidator, forgotPassword);

authRoute.get('/logout', logoutUser);

authRoute.get('/get-me', identifyUser, getUser);

export default authRoute;