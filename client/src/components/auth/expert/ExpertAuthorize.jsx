import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExpertAuthorize = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/expert/authorization', {
        email,
        name,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("There was an error registering the user:", error);
      setMessage("Error registering user");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border text-black rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border text-black rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      <Link
        to="/confirm-registration"
        className="text-blue-500 underline mt-4 inline-block"
      >
        MOVE TO THE NEXT PAGE
      </Link>
    </div>
  );
}

export default ExpertAuthorize;
