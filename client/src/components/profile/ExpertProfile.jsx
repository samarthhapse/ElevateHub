import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getExpertDetails } from '../api/expertapi';
import { MdMessage } from 'react-icons/md';
import axios from 'axios';
import CustomButton from '../meetings/Button';

const ExpertProfile = ({ onPayNow }) => {
  console.log("exp profile");
  const { id } = useParams();
  const [expert, setExpert] = useState(null);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await getExpertDetails(id);
        const { data } = response;
        console.log(data);
        setExpert(data.user);
      } catch (error) {
        console.error('Failed to fetch expert', error);
      }
    };

    fetchExpert();
  }, [id]);

  if (!expert) {
    return <div>Loading...</div>;
  }

  const handlePayNow = async (expertId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/payment/checkout', {
        amount: 500,
      });

      const { order } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Sarthi',
        description: 'Expert Assistance Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post('http://localhost:5000/api/v1/payment/paymentverification', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              alert(`Payment successful for expert ${expertId}`);
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification failed', error);
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'your-email@example.com',
          contact: 'Your Phone Number',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded shadow-lg mt-8">
      <CustomButton />
      <div className="flex items-center mb-6">
        <img
          className="w-32 h-32 object-cover rounded-full mr-6"
          src={expert.avatar}
          alt={`${expert.name}'s avatar`}
        />
        <div>
          <h1 className="text-3xl font-bold">{expert.name}</h1>
          <p className="text-gray-300">
            {expert.jobTitle || 'No job title provided'}
          </p>
        </div>
        <Link className="ml-auto" to={`/message/${id}`}>
          <MdMessage />
        </Link>
      </div>
      <div className="space-y-4">
        <p>
          <strong>Email:</strong> {expert.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {expert.phoneNo}
        </p>
        <p>
          <strong>Expertise:</strong> {expert.expertise}
        </p>
        <p>
          <strong>Field:</strong> {expert.field}
        </p>
        <p>
          <strong>Connected Students:</strong> {expert.connectedStudents.length}
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePayNow(expert._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default ExpertProfile;

