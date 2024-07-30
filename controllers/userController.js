import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

class UserController {
    constructor(){}

    // Login User
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await userModel.findOne({ email });
            console.log(user);
            if (!user) {
                return res.status(401).json({ message: "User not found", success: false });
            }

            const comparePassword = await user.comparePassword(password);
            if (!comparePassword) {
                return res.status(401).json({ message: "Wrong user password", success: false });
            }

            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login Successful", success: true, accessToken: token });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    }   

    // Register User
    async registerUser(req, res) {
        const { name, email, password } = req.body;

        try {
            const checkUser = await userModel.findOne({ email });
            console.log("checkUser",checkUser)
            if (checkUser) {
                return res.status(400).json({ message: "User already registered, please login", success: false });
            }

            const user = new userModel({ name, email, password });
            console.log(user);
            await user.save();
            console.log("saved")
            return res.status(200).json({ message: "User successfully registered", success: true });
        } catch (err) {
            return res.status(500).json({ message: "Error registering new user", success: false,error:err.message });
        }
    }
}

export default UserController;
