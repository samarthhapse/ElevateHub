import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ExpertConfirmation = () => {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleConfirmUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/expert/confirm-registration`,
        { email, confirmationCode }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("There was an error confirming the user:", error);
      setMessage("Error confirming user");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Confirm User</h1>
      <form onSubmit={handleConfirmUser} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-black border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Confirmation Code</label>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="w-full px-4 py-2 border text-black rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Confirm
        </button>
      </form>
      {message && <p className="mt-4">{message} <br />
      <div>
        <Link
        to="/expertsignup"
        className="text-blue-500 underline mt-4 inline-block"
      >
       REGISTER AS AN EXPERT
      </Link>
      </div>
      </p>}
    </div>
  );
};

export default ExpertConfirmation;
