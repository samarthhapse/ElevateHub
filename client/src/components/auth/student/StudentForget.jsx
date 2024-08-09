import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { studentChangePassword } from "../../api/studentapi";
import { useTheme } from "../../providers/ThemeProvider";

const StudentForget = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [inputs, setInputs] = useState({
    email: "",
    current_password: "",
    new_password: "",
    confirm_new_password: "",
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
      const response = await studentChangePassword(inputs);
      alert(response.data.message);
      setInputs({
        email: "",
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
      navigate("/expertlogin");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={`w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center ${isDarkMode ? 'bg-custom-gradient text-white' : 'bg-white'}`}>
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
        <div className={`flex-[1.5] flex flex-col p-10 ${isDarkMode ? 'bg-card-custom-gradient' : 'bg-teal-500 text-white'}`}>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-[serif] mb-5">Reset Password</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={inputs.email}
              required
              className="text-black w-full md:w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="password"
              placeholder="Current password"
              name="current_password"
              onChange={handleChange}
              value={inputs.current_password}
              required
              className="text-black w-full md:w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="password"
              placeholder="New password"
              name="new_password"
              onChange={handleChange}
              value={inputs.new_password}
              required
              className="text-black w-full md:w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirm_new_password"
              onChange={handleChange}
              value={inputs.confirm_new_password}
              required
              className="text-black w-full md:w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <button type="submit" className="mt-4 bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600">
              Submit
            </button>
          </form>
        </div>
        <div className={`flex-1 flex flex-col items-center justify-center bg-card-custom-gradient p-10 ${isDarkMode ? 'bg-card-custom-gradient' : 'bg-teal-500 text-white'}`}>
          <h1 className="text-white text-2xl font-[serif] text-center">Do not want to change password?</h1>
          <Link to='/expertlogin'>
            <button type="button" className="mt-6 bg-white text-teal-500 font-bold text-md py-2 px-6 rounded-full transition-all hover:bg-gray-100">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentForget;

