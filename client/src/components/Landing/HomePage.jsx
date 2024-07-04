import Box from "../Basic/Box";
import Marquee from "../Basic/Marquee";
import Results from "../Basic/Results";
import Overview from "../Basic/Overview";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner from "../Basic/Banner";
import Form from "../Basic/Form";
import Faq from "../Basic/Faq";
import Footer from "../Basic/Footer";
import Main from '../../assets/Main.png' 
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
const HomePage = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className= {`max-w-full overflow-x-hidden ${isDarkMode ? 'bg-newgreen text-white':''}`}>
      <div className= {`flex flex-col justify-between items-center ${isDarkMode ? 'bg-newgreen text-white':'bg-white'} min-h-screen max-w-100vw md:w-full sm:flex-row`} >
  <div className=" text-left max-w-3xl flex flex-col justify-center p-8 mt-6 sm:mr-11 sm:ml-3">
    <h2 className="uppercase text-sm font-semibold text-gray-450 mb-2">
            10x Webinar Value & Repurpose Content with AI
          </h2>
          <h1 className={`text-5xl font-bold ${isDarkMode ? 'bg-newgreen text-white':' text-gray-800'} mb-6 sm:w-96 `}>
            Webinar software for the modern marketer
          </h1>
          <p className="text-lg text-gray-450 mb-8">
            Seamlessly Design, Host, and Repurpose Company Town
          </p>
          <div className="flex space-x-4">
          <Link to="/Landing">
            <button className="bg-blue-600  flex  text-white px-6 py-3 rounded-3xl shadow-lg hover:bg-blue-700 transition duration-300">
              Try it yourself
            </button>
            </Link>
          </div>
        </div>
        <div className="relative mt-16 h-full max-w-4xl ml-3 sm:ml-11 flex justify-end">
    <div className="relative p-6 w-full sm:w-[300px] h-[390px] bg-black rounded-lg shadow-lg  rounded-1-custom  ml-[-70px]">
      <div className="absolute bottom-0  top-0 right-0 mr-3 w-[540px] h-[395px] bg-black rounded-l-custom "></div>
      <div className="relative z-10 p-5 mt-5 back rounded-lg shadow-lg mr-2">
        <div className="bg-white p-2 rounded-lg shadow-lg">
                <img
                  src="https://as1.ftcdn.net/v2/jpg/05/55/13/42/1000_F_555134240_TwHE9DMBbjxw4sr7Ud3Tt9FPmQMJ8DjQ.jpg"
                  alt="Maria Leon"
                  style={{height:"200px"}}
                  className="w-full h-68 rounded-lg object-cover"
                />
                <p className="mt-2 text-center text-gray-700">Maria Leon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <motion.div 
            
            className="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24 rounded-2xl">

              <div className="mx-auto max-w-xl">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Your One-Stop Destination for {" "}
                </h2>
                <br></br>

                <div className="hidden text-white md:block mt-4">
                  <ul className="text-lg">
                    <li>Bug Solving</li>
                    <li>Tech Career Assistance</li>
                    <li>Academic Support</li>
                    <li>Career Advice</li>
                    <li>Global Connection</li>
                  </ul>
                </div>
                <br></br>

                <div className="mt-4 md:mt-8 text-center">
                  <Link
                    to="/Landing"
                    className="inline-block rounded border border-white bg-white px-9 py-3 text-md font-bold text-blue-900 transition hover:bg-transparent hover:text-lg hover:px-8 hover:text-white hover:rounded-xl"
                  >
                    Get Started Today
                  </Link>
                </div>
              </div>
            </motion.div>
      
            <div className="">
              <img
                alt="Gym room"
                src={Main}
                className="h-40 w-full object-cover sm:h-56 md:h-full rounded-2xl"
                loading="lazy"
              />
              
            </div>
          </div>
        </div>
      </section>
        
      <Marquee />
      <Box />
      <Results/>
      <Overview/>
      <Banner/>
      <Form/>
      <Faq/>
      <Footer/>
    </div>
  );
};

export default HomePage;