import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/expertapi";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../../redux/expertSlice";
import { motion } from "framer-motion";

const ExpertLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(inputs);
      if (response.status === 200) {
        alert(response.data.message);
        dispatch(setAuthToken(response.data.token));
        setInputs({
          email: '',
          password: '',
        });
        navigate("/experthome");
      } else {
        alert('error while logging');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-5 bg-cover bg-center bg-custom-gradient text-white">
      <motion.div
        className="w-[900px] flex rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        <div className="flex-[1.5] flex flex-col items-center justify-center bg-white p-10 bg-card-custom-gradient text-white">
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
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
              required
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <a href="/expertforget" className="text-md font-medium text-gray-950 hover:text-gray-700">Forget password?</a>
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
        <div className="flex-1 flex flex-col items-center justify-center bg-teal-500 p-3 bg-card-custom-gradient text-white">
          <h1 className="text-white text-2xl font-[serif]">Do not have an account?</h1>
          <Link to='/expertsignup'>
            <motion.button
              type="button"
              className="mt-6 bg-white text-teal-500 font-bold text-md py-2 px-6 rounded-full transition-all hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Sign up
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpertLogin;
