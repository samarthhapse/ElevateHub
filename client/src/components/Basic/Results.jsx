import { FaStar, FaShareAlt, FaDollarSign } from 'react-icons/fa';

const Results = () => {
  return (
    <main className="text-center p-6 pb-1 bg-[#fdf9f6] min-h-screen mt-8 ">
      <br></br>
      <h1 className="text-xl font-semibold text-gray-600 mb-11">
        WEBINAR SOFTWARE THAT GETS RESULTS BY REPURPOSING AND SCALING VIDEO CONTENT
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-[50px]">
        <div className="bg-gray-200 hover:bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaStar className="text-6xl text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">8.5X</h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">More Memorable</h3>
          <p className="text-gray-600">
            Viewers retain 95% of a message when they watch it in a video, compared to 10% when reading in text.
            Use Welcome&apos;s webinar software to be memorable.
          </p>
        </div>
        <div className="bg-gray-200 hover:bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaShareAlt className="text-6xl text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">20X</h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Reach</h3>
          <p className="text-gray-600">
            Members on social media platforms like LinkedIn are 20x more likely to share and engage with a video than
            other types of posts or content.
          </p>
        </div>
        <div className="bg-gray-200 hover:bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaDollarSign className="text-6xl text-green-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">$30K</h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">In Cost Savings</h3>
          <p className="text-gray-600">
            Video editing is expensive and time-consuming. On average, marketers spend $30,000 to $50,000 on
            production agencies to deliver a few clips.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Results;