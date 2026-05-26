import { Router } from 'express';
import { forgotPassword, getUser, loginUser, logoutUser, register } from '../controllers/authController.js';
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { forgotPasswordValidator, loginValidator, registerValidator } from '../validators/authValidator.js';
import identifyUser from '../middlewares/authMiddleware.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './src/assets/temp/';

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {
                recursive: true
            });
        }

        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);

        cb(null, uniqueName + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });


const authRoute = Router();

authRoute.post('/register', upload.single('PROPIC'), registerValidator, register);

authRoute.post('/login', loginValidator, loginUser);

authRoute.post('/forgotPassword', forgotPasswordValidator, forgotPassword);

authRoute.get('/logout', logoutUser);

authRoute.get('/get-me', identifyUser, getUser);

export default authRoute;