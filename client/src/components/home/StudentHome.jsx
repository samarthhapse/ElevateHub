import React, { useEffect, useState } from "react";
// import ExpertiseCard from "./studentHome/ExpertiseCard";
import ExpertCard from "./studentHome/ExpertCard";
import { getAllExperts } from "../api/expertapi";
import axios from "axios";
// import FilterComponent from "./studentHome/Filter";

const StudentHome = () => {
  const [selectedExpertise, setSelectedExpertise] = useState("All");
  const [experts, setExperts] = useState([]);
  const [allExperts, setAllExperts] = useState([]);

  const handleChange = (event) => {
    setSelectedExpertise(event.target.value);
  };

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await getAllExperts();
        const { data } = response;

        setAllExperts(data.user);
        setExperts(data.user);
      } catch (error) {
        console.error("Failed to fetch experts", error);
      }
    };
    fetchExperts();
  }, []);

  useEffect(() => {
    if (selectedExpertise === "All") {
      setExperts(allExperts);
      return;
    }
    const expert = allExperts.filter(
      (expert) => expert.expertise === selectedExpertise
    );
    setExperts(expert);
  }, [selectedExpertise]);

  const handlePayNow = async (expertId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/payment/checkout", {
        amount: 500, 
      });

      const { order } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Sarthi",
        description: "Expert Assistance Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post("http://localhost:5000/api/v1/payment/paymentverification", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              alert(`Payment successful for expert ${expertId}`);
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification failed", error);
          }
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "Your Phone Number",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4 mt-4">
        <label htmlFor="exp-selector" className="text-xl font-medium">
          Select an expertise:
        </label>
        <select
          name="expertise"
          id="exp-selector"
          className="rounded-md px-4 py-2 w-64 bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedExpertise}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="Tech career assistance">Tech career assistance</option>
          <option value="Bug solving">Bug solving</option>
          <option value="Academic support">Academic support</option>
        </select>
      </div>

      <div className="w-screen p-10 flex gap-8 flex-wrap">
        {experts.map((expert) => (
          <ExpertCard expert={expert} key={expert._id} onPayNow={handlePayNow} />
        ))}
      </div>
    </>
  );
};

export default StudentHome;


