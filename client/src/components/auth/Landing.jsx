import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import backgroundImage from "../../assets/pic5.jpg";
import studentImage from "../../assets/pic3.png";
import teacherImage from "../../assets/pic2.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>

      <motion.div
        className="relative bg-gray-900 bg-opacity-70 p-8 md:p-12 rounded-lg w-full max-w-3xl mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Choose Your Profession
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12">
          <img
            src={studentImage}
            alt="Student"
            className="w-40 h-auto md:w-64 mb-6 md:mb-0"
            style={{ zIndex: 1 }}
          />
          <motion.button
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 md:px-8 rounded-lg shadow-lg hover:bg-gradient-to-l w-full md:w-auto mb-6 md:mb-0 transition-transform transform-gpu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/studentlogin")}
          >
            <FaUserGraduate className="mr-3 text-xl" /> Student
          </motion.button>
          <motion.button
            className="flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-4 px-6 md:px-8 rounded-lg shadow-lg hover:bg-gradient-to-l w-full md:w-auto transition-transform transform-gpu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/expertlogin")}
          >
            <FaUserTie className="mr-3 text-xl" /> Expert
          </motion.button>
          <img
            src={teacherImage}
            alt="Teacher"
            className="w-40 h-auto md:w-64 mb-6 md:mb-0"
            style={{ zIndex: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
