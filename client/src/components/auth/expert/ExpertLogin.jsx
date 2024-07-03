import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { expertLogin } from "../../api/expertapi";
import { useDispatch } from "react-redux";
import { setExpertAuthToken, setExpertData } from "../../../redux/expertSlice";
import { motion } from "framer-motion";
import { useTheme } from "../../providers/ThemeProvider";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { GoogleLogin } from "react-google-login";

const ExpertLogin = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await expertLogin(inputs);
      if (response.status === 200) {
        alert(response.data.message);
       
        dispatch(setExpertAuthToken(response.data.token));
        dispatch(setExpertData(response.data.userData));
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({ type: "expert", ...response.data.userData })
        );
        setInputs({
          email: "",
          password: "",
        });
        navigate("/experthome");
      } else {
        alert("Error while logging in");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            isDarkMode ? " bg-card-custom-gradient " : " bg-teal-500 text-black"
          }`}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl font-[serif] mb-5">Expert login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={inputs.email}
              required
              className="w-[370px] py-4 px-6 mb-8 mt-10 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <div className="relative w-[370px] mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={inputs.password}
                required
                className="w-full py-4 px-6 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
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
            <a
              href="/expertforget"
              className="text-md font-medium text-gray-950 hover:text-gray-700"
            >
              Forget password?
            </a>
            <motion.button
              type="submit"
              className="mt-4 bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          </motion.form>
        </div>
        <div
          className={`flex-1 flex flex-col items-center justify-center bg-card-custom-gradient p-3 ${
            isDarkMode ? "bg-card-custom-gradient" : " bg-teal-500 text-white"
          }`}
        >
          <h1 className="text-white text-2xl font-[serif]">
            Do not have an account?
          </h1>
          <Link to="/expertsignup">
            <motion.button
              type="button"
              className="mt-6 bg-white text-teal-500 font-bold text-md py-2 px-6 rounded-full transition-all hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Sign up
            </motion.button>
          </Link>
          <div className="mt-6">
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
                  Sign in with Google
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

export default ExpertLogin;
