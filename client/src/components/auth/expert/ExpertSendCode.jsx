import React, { useState } from 'react';
import axios from 'axios';
const ExpertSendCode = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSendCode = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/v1/expert/sendCode', { email });
        setMessage(response.data.message);
      } catch (error) {
        console.error('There was an error sending the confirmation code:', error);
        setMessage('Error sending confirmation code');
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Send Confirmation Code</h1>
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-md"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Send Code</button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    );
}

export default ExpertSendCode ;