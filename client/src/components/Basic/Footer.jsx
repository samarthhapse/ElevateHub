

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 w-[100vw]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold text-white">Meet with a Webinar & Virtual Event Expert</h1>
          <p className="mt-2 text-gray-300">We&apos;ll take the work out of elevating your virtual experiences</p>
          <button className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
            Talk with an expert
          </button>
          
        </div>
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold text-white">PRODUCT</h2>
          <ul className="mt-4 space-y-2">
            <li className="hover:text-gray-400 transition duration-300">Create & Integrate</li>
            <li className="hover:text-gray-400 transition duration-300">Welcome Studio</li>
            <li className="hover:text-gray-400 transition duration-300">Content Creator</li>
          </ul>
        </div>
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold text-white">RESOURCES</h2>
          <ul className="mt-4 space-y-2">
            <li className="hover:text-gray-400 transition duration-300">Open Doors Community</li>
            <li className="hover:text-gray-400 transition duration-300">Customer Support</li>
          </ul>
        </div>
        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold text-white">TRENDING POSTS</h2>
          <ul className="mt-4 space-y-2">
            <li className="hover:text-gray-400 transition duration-300">Welcome’s Next Evolution: Webinars and Content at Scale</li>
            <li className="hover:text-gray-400 transition duration-300">ABM and Demand Generation: A New Perspective</li>
          </ul>
        </div>
      </div>
      <div className=" mx-auto mt-12">
        <h2 className="text-lg font-semibold text-white">LOVED AND TRUSTED</h2>
        <div className="flex flex-wrap mt-4 justify-center items-center">
          <div className="w-1/2 md:w-1/4 p-2">
            <div className="bg-white text-black p-4 rounded shadow hover:shadow-lg transition duration-300">
              <p align="center">Best Support</p>
              <p align="center">Mid-Market</p>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <div className="bg-white text-black p-4 rounded shadow hover:shadow-lg transition duration-300">
              <p align="center">Leader</p>
              <p align="center">Mid-Market</p>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <div className="bg-white text-black p-4 rounded shadow hover:shadow-lg transition duration-300">
              <p align="center">Easiest To Do Business With</p>
              <p align="center">Mid-Market</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-6 h-6">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-400">
          <p>© 2023 Welcome. All rights reserved</p>
          <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;