import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import image1 from "../../../assets/img1.png";
import { useTheme } from "../../providers/ThemeProvider";
import { studentRegister } from "../../api/studentapi";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../../redux/studentSlice";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const StudentSignup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (inputs.password !== inputs.confirmPassword) {
                alert("Confirm password does not match.");
                return;
            }
            const response = await axios.post(
                "http://localhost:5000/api/v1/otp/sendotp",
                { email: inputs.email }
            );
            alert(response.data.message);
            navigate("/otpverifystudent", { state: { userData: inputs } });
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleGoogleLogin = async () => {
        setIsGoogleLogin(true);

        try {
            // Perform Google OAuth login logic here

            // Mock data for illustration purposes
            const user = {
                name: "Google User",
                email: "googleuser@example.com",
                // Add other necessary fields fetched from Google
            };

            // Prepare data for registration
            const data = {
                name: user.name,
                email: user.email,
                phoneNo: "1111111111", // Ensure to handle phoneNo properly
                password: "abc", // Example password (replace with actual logic)
                confirmPassword: "abc", // Example confirmPassword (replace with actual logic)
                otp: "1111", // Ensure to handle otp properly
                GoogleLogin: true,
            };

            // Register the user
            const response = await studentRegister(data);

            if (!response.data.success) {
                alert("The User Info Is not Created in the Database");
                setIsGoogleLogin(false);
                return;
            } else {
                console.log(response.data);
            }

            // Dispatch token to state
            dispatch(setAuthToken(response.data.token));

            // Reset form inputs
            setInputs({
                name: "",
                email: "",
                phoneNo: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            // Handle errors
            console.error("There was an error:", error);
            alert(
                error.response
                    ? error.response.data.message
                    : "An error occurred during Google Login"
            );
            setIsGoogleLogin(false);
        }
    };

    return (
        <div
            className={`w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center ${
                isDarkMode ? "bg-custom-gradient text-black" : " bg-white "
            } `}
        >
            <motion.div
                className="w-[900px] flex rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div
                    className={`flex-[1.5] flex flex-col  p-10 ${
                        isDarkMode
                            ? " bg-card-custom-gradient "
                            : " bg-teal-500 text-black"
                    }`}
                >
                    <div className="flex justify-start items-start pb-6 text-2xl font-bold">
                        <h1 className=" text-green-400">Sarthi</h1>
                    </div>
                    <motion.form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-[serif] mb-5 ">
                            Create Your Account
                        </h1>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            value={inputs.name}
                            required={!isGoogleLogin}
                            className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={inputs.email}
                            required={!isGoogleLogin}
                            className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
                        />
                        <input
                            type="text"
                            placeholder="Phone number"
                            name="phoneNo"
                            onChange={handleChange}
                            value={inputs.phoneNo}
                            required={!isGoogleLogin}
                            className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
                        />
                        <div className="relative w-[370px] mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={inputs.password}
                                required={!isGoogleLogin}
                                className="w-full py-4 px-6 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <IoEyeOffOutline size={24} />
                                ) : (
                                    <IoEyeOutline size={24} />
                                )}
                            </button>
                        </div>
                        <div className="relative w-[370px] mb-4">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={inputs.confirmPassword}
                                required={!isGoogleLogin}
                                className="w-full py-4 px-6 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? (
                                    <IoEyeOffOutline size={24} />
                                ) : (
                                    <IoEyeOutline size={24} />
                                )}
                            </button>
                        </div>
                        {error && (
                            <p className=" text-red-500 text-sm">{error}</p>
                        )}
                        <div className="flex space-x-4">
                            <motion.button
                                type="button" // Use type="button" to prevent form submission
                                className="bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGoogleLogin}
                            >
                                Sign up with Google
                            </motion.button>
                            <motion.button
                                type="submit"
                                className="bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sign up
                            </motion.button>
                        </div>
                    </motion.form>
                </div>
                <div
                    className={`flex-1 flex flex-col items-center justify-center bg-card-custom-gradient p-3 ${
                        isDarkMode
                            ? "bg-card-custom-gradient"
                            : " bg-teal-500 text-white"
                    }`}
                >
                    <img
                        src={image1}
                        alt="Hello"
                        height={300}
                        width={300}
                        className="mb-4"
                    />
                    <h1 className="text-white text-2xl font-[serif]">
                        Already a registered student?
                    </h1>
                    <Link to="/studentlogin">
                        <motion.button
                            type="button"
                            className="mt-6 bg-white text-teal-500 font-bold text-md py-2 px-6 rounded-full transition-all hover:bg-gray-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Sign in
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentSignup;
