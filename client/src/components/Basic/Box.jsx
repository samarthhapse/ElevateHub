import  { useEffect, useState } from "react";


const Box = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const gapSize = Math.max(0, 100 - scrollPosition * 0.1);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center backbox w-full">
        <div className=" max-w-[1200px] w-full p-8 bg-black text-white rounded-lg">
          <h1 className="text-5xl font-bold">Have your cake, and eat it too</h1>
          <p className="mt-4 text-2xl">
            Host beautiful webinars and scale your content all at once.
          </p>
        </div>
        <div
          className="flex flex-col sm:flex-row justify-center w-full p-8 space-y-8 sm:space-y-0 sm:space-x-8"
          style={{ gap: `${gapSize}px` }}
        >
          <div className="w-full sm:w-1/2 p-8 bg-red-500 text-white rounded-lg">
            <h2 className="text-3xl font-bold">Host Engaging Webinars</h2>
            <br></br>
            <div className="mt-4">
              <div className="flex flex-col space-y-4">
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD37ePQY7vUc5j8KGlR5chInH0ejRDtQ2Oyw&s"
                      alt="Profile"
                      style={{height:"40px"}}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-bold text-left">Ricky Smith</p>
                      <p>Ok, drop comments, they&apos;re looking!</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD37ePQY7vUc5j8KGlR5chInH0ejRDtQ2Oyw&s"
                      alt="Profile"
                      style={{height:"40px"}}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-bold">Frances Swann</p>
                      <p className="text-left">🔥🔥🔥</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD37ePQY7vUc5j8KGlR5chInH0ejRDtQ2Oyw&s"
                      alt="Profile"
                      style={{height:"40px"}}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-bold">Rodger Struck</p>
                      <p className="text-left">🚀</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 p-8 bg-blue-500 text-white rounded-lg">
            <h2 className="text-3xl font-bold">Instantly Create Content</h2>
            <br></br>
            <div className="mt-4">
              <div className="bg-white text-black p-4 rounded-lg shadow-md">
                <p className="font-bold">Create Clips powered by AI</p>
                <p className="mt-2">
                  Now, as you may know, video content is no longer an optional
                  part of marketing strategies; it&apos;s an essential element. In
                  fact, 85% of businesses now use video as a marketing tool,
                  according to a 2023 report.
                </p>
              </div>
              <div className="bg-white text-black p-4 rounded-lg shadow-md mt-4">
                <p className="font-bold">
                  The Data Behind Video Content Effectiveness
                </p>
                <p className="mt-2">
                  Video content effectiveness is not just a trend but a proven
                  method for increasing engagement and conversions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;