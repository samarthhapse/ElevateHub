import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "../../providers/ThemeProvider";
import image1 from "../../../assets/img1.png";
import { GoogleLogin } from "react-google-login";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ExpertSignup = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const avatarInputRef = useRef(null);
  const [error, setError] = useState(null);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phoneNo: "",
    expertise: "",
    field: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (
      [...Object.values(inputs), image].some((input) => !input || input === "")
    ) {
      setError("All fields are required");
      return;
    }
    inputs.avatar = image;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/otp/sendotp",
        { email: inputs.email }
      );
      alert(response.data.message);
      setInputs({
        name: "",
        email: "",
        phoneNo: "",
        expertise: "",
        field: "",
        jobTitle: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/otpverifyexpert", { state: { userData: inputs } });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const addAvatar = () => {
    avatarInputRef.current.click();
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      // Handle your Google OAuth signup logic here
      console.log(result, token);
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log("Google Sign Up was unsuccessful. Try again later.", error);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <h1 className="text-4xl font-[serif] mb-5">Create Your Account</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className=" hidden"
              ref={avatarInputRef}
            />
            {preview && (
              <img
                src={preview}
                alt="Avatar Preview"
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              />
            )}
            <button
              onClick={addAvatar}
              type="button"
              className=" mt-6 bg-green-400 w-32 h-12  text-xl border-none rounded-3xl mb-6	 hover:bg-green-500 active:bg-green-600"
            >
              Add Avatar
            </button>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={inputs.email}
              required
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Phone number"
              name="phoneNo"
              onChange={handleChange}
              value={inputs.phoneNo}
              required
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Field"
              name="field"
              onChange={handleChange}
              value={inputs.field}
              required
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Job title"
              name="jobTitle"
              onChange={handleChange}
              value={inputs.jobTitle}
              required
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <div className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={inputs.password}
                required
                className="flex-1 outline-none bg-transparent"
              />
              <button type="button" onClick={togglePasswordVisibility} className="ml-2">
                {showPassword ? <IoEyeOffOutline size={24} /> : <IoEyeOutline size={24} />}
              </button>
            </div>
            <div className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={handleChange}
                value={inputs.confirmPassword}
                required
                className="flex-1 outline-none bg-transparent"
              />
              <button type="button" onClick={toggleConfirmPasswordVisibility} className="ml-2">
                {showConfirmPassword ? <IoEyeOffOutline size={24} /> : <IoEyeOutline size={24} />}
              </button>
            </div>
            <div className="mb-4 mr-32">
              <div className="mr-40">
                <h3 className="text-md font-md mb-2">Expertise:</h3>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <input
                    type="radio"
                    id="bugSolving"
                    name="expertise"
                    value="Bug solving"
                    onChange={handleChange}
                    checked={inputs.expertise === "Bug solving"}
                    className="mr-2"
                  />
                  <label htmlFor="bugSolving" className="mr-4">
                    Bug solving
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    id="techCareer"
                    name="expertise"
                    value="Tech career assistance"
                    onChange={handleChange}
                    checked={inputs.expertise === "Tech career assistance"}
                    className="mr-2"
                  />
                  <label htmlFor="techCareer" className="mr-4">
                    Tech career assistance
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    id="academicSupport"
                    name="expertise"
                    value="Academic support"
                    onChange={handleChange}
                    checked={inputs.expertise === "Academic support"}
                    className="mr-2"
                  />
                  <label htmlFor="academicSupport">Academic support</label>
                </div>
              </div>
            </div>
            {error && (
              <p className=" text-red-500 text-sm">{error}</p>
            )}
            <motion.button
              type="submit"
              className="mt-4 bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600"
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
          <img src={image1} alt="Hello" height={300} width={300} />
          <h1 className="text-white text-2xl font-[serif]">
            Already a registered expert?
          </h1>
          <Link to="/expertlogin">
            <motion.button
              type="button"
              className="mt-6 bg-white text-teal-500 font-bold text-md py-2 px-6 rounded-full transition-all hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Sign in
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

export default ExpertSignup;
