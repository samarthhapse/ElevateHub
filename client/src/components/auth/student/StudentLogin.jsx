import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { studentLogin } from "../../api/studentapi";
import { useDispatch } from "react-redux";
import { setStudentAuthToken, setStudentData } from "../../../redux/studentSlice";
import { motion } from "framer-motion";
import { useTheme } from "../../providers/ThemeProvider";
import { account } from "../../utils/appwrite";

const StudentLogin = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
const [isGoogleLogin, setIsGoogleLogin] = useState(false);

const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
        const response = await studentLogin(inputs);
        if (response.status === 200) {
            alert(response.data.message);
            dispatch(setStudentAuthToken(response.data.token));
            dispatch(setStudentData(response.data));
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem(
                "userData",
                JSON.stringify({ type: "student", ...response.data.userData })
            );
        }
    } catch (error) {
        // Handle error
    }
};

const handleChange = (e) => {
    setIsGoogleLogin(false); // Adjust this line based on your logic
    setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
    });
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await studentLogin(inputs);
            if (response.status === 200) {
                alert(response.data.message);
                dispatch(setAuthToken(response.data.token));
                dispatch(setStudentData(response.data));
                setInputs({
                    email: "",
                    password: "",
                });
                navigate("/studenthome");
            } else {
                alert("Error while logging in");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLogin(true);
            await account.createOAuth2Session(
                "google",
                "http://localhost:5173/studenthome",
                "http://localhost:5173/fail"
            );
            const user = await getGoogleLoginUser();
            if (!user || user.message) {
                alert("There was a problem in the Google Auth");
                return;
            }
            const data = {
                email: user.email,
                GoogleLogin: true,
            };
            const response = await studentLogin(data);
            if (response.status === 200) {
                alert(response.data.message);
                dispatch(setAuthToken(response.data.token));
                dispatch(setExpertData(response.data.userData));
                setInputs({
                    email: "",
                    password: "",
                });
                navigate("/studenthome");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(
                "There was an error while handling the Google login: " +
                    error.response.data.message
            );
        }
    };

    const getGoogleLoginUser = async () => {
        try {
            const user = await account.get();
            console.log(user);
            return user;
        } catch (err) {
            console.log(
                "Error Have Been caught fetching the account details: ",
                err
            );
        }
    };

    return (
        <div
            className={`w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center ${
                isDarkMode ? "bg-custom-gradient text-black" : " bg-white "
            } `}>
            <motion.div
                className="w-[900px] flex rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <div
                    className={`flex-[1.5] flex flex-col  p-10 ${
                        isDarkMode
                            ? " bg-card-custom-gradient "
                            : " bg-teal-500 text-black"
                    }`}>
                    <motion.form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}>
                        <h1 className="text-4xl font-[serif] mb-5">
                            Student login
                        </h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={inputs.email}
                            required={!isGoogleLogin}
                            className="w-[370px] py-4 px-6 mb-8 mt-10 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={inputs.password}
                            required={!isGoogleLogin}
                            className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                        />
                        <a
                            href="/studentforget"
                            className="text-md font-medium text-white hover:text-green-700">
                            Forget password?
                        </a>
                        <div className="flex space-x-4">
                            <motion.button
                                type="button"
                                className="bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGoogleLogin}>
                                Login with Google
                            </motion.button>
                            <motion.button
                                type="submit"
                                className="bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsGoogleLogin(false)}>
                                Login
                            </motion.button>
                        </div>
                    </motion.form>
                </div>
                <div
                    className={`flex-1 flex flex-col items-center justify-center bg-card-custom-gradient p-3 ${
                        isDarkMode
                            ? "bg-card-custom-gradient"
                            : " bg-teal-500 text-white"
                    }`}>
                    <h1 className="text-white text-2xl font-[serif]">
                        Do not have an account?
                    </h1>
                    <Link to="/studentsignup">
                        <motion.button
                            type="button"
                            className="mt-6 bg-white text-teal-500 font-bold text-md py-2 px-6 rounded-full transition-all hover:bg-gray-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            Sign up
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentLogin;
