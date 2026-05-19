import jwt from 'jsonwebtoken'
import userModel from "../models/users.js";

export async function register(req, res) {

    const { name, email, password, role, phone } = req.body;
    const proPic = req.file;

    const isAlreayExist = await userModel.findOne({ email });

    if (isAlreayExist) {
        res.status(401).json({
            message: "User alreay exist with this email and password"
        })
    }

    const user = await userModel.create({
        name, 
        email, 
        password, 
        role, 
        phone,
        ProfilePic: proPic?.path
    });

    const token = jwt.sign({
        userID: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('JWT_TKOEN', token);

    res.status(201).json({
        message: "User Register Successfully",
        user
    });
}

export async function loginUser(req, res) {

    const { email, password, role } = req.body;

    const user = await userModel.findOne({ 
        email: email,
        role: role
    });

    if (!user) {
        res.status(404).json({
            message: "User Not Found With This Email Or Role"
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        userID: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("JWT_TOKEN", token);

    res.status(201).json({
        message: "User Login Successfully",
        user
    });
}

export async function forgotPassword(req, res) {
    const { email , password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(404).json({
            message: "User Not Found With This Email"
        })
    }

    user.password = password;
    user.save();

    res.status(201).json({
        message: "Password Reset Successfully"
    });
}

export async function logoutUser(req, res) {
    res.clearCookie("JWT_TOKEN");

    res.status(201).json({
        message: "User Logout Successfully "
    });
} 

export async function getUser(req, res) {

    const { userID } = req.user;

    const user = await userModel.findById(userID);

    if (!user) {
        return res.status(401).json({
            message: "User not Found"
        })
    }

    return res.status(200).json({
        message: "User Fetched Successfullt",
        user
    });
}