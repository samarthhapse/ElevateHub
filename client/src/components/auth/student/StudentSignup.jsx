import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import image1 from "../../../assets/img1.png";
import { useTheme } from "../../providers/ThemeProvider";
import { GoogleLogin } from "react-google-login";

const StudentSignup = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

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
      setInputs({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/otpverifystudent", { state: { userData: inputs } });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      // Handle your Google OAuth login logic here
      console.log(result, token);
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log("Google Sign In was unsuccessful. Try again later.", error);
  };

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center ${
        isDarkMode ? "bg-custom-gradient text-black" : "bg-white"
      }`}
    >
      <motion.div
        className="w-full max-w-[900px] flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className={`flex-[1.5] flex flex-col p-6 sm:p-10 ${
            isDarkMode ? " bg-card-custom-gradient " : " bg-teal-500 text-black"
          }`}
        >
          <div className="flex justify-start items-start pb-6 text-2xl font-bold">
            <h1 className="text-green-400">sarthi</h1>
          </div>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl font-[serif] mb-5 ">
              Create Your Account
            </h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
              className="w-full max-w-[370px] py-3 sm:py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={inputs.email}
              required
              className="w-full max-w-[370px] py-3 sm:py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
            />
            <input
              type="text"
              placeholder="Phone number"
              name="phoneNo"
              onChange={handleChange}
              value={inputs.phoneNo}
              required
              className="w-full max-w-[370px] py-3 sm:py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
              required
              className="w-full max-w-[370px] py-3 sm:py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleChange}
              value={inputs.confirmPassword}
              required
              className="w-full max-w-[370px] py-3 sm:py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 text-black"
            />
            <motion.button
              type="submit"
              className="mt-4 bg-teal-500 text-white font-bold text-md py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all hover:bg-teal-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign up
            </motion.button>
          </motion.form>
        </div>
        <div
          className={`flex-1 flex flex-col items-center justify-center bg-card-custom-gradient p-3 ${
            isDarkMode ? "bg-card-custom-gradient" : " bg-teal-500 text-white"
          }`}
        >
          <img src={image1} alt="Hello" className="w-3/4 sm:w-full max-w-[300px] mb-6" />
          <h1 className="text-white text-lg sm:text-2xl font-[serif] text-center">
            Already a registered student?
          </h1>
          <Link to="/studentlogin">
            <motion.button
              type="button"
              className="mt-4 sm:mt-6 bg-white text-teal-500 font-bold text-sm sm:text-md py-2 px-4 sm:px-6 rounded-full transition-all hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Sign in
            </motion.button>
          </Link>
          <div className="mt-4 sm:mt-6">
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              render={(renderProps) => (
                <motion.button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-all cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Sign up with Google
                </motion.button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentSignup;

