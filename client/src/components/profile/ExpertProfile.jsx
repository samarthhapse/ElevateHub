import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getExpertDetails } from "../api/expertapi";
import { MdMessage } from "react-icons/md";

const ExpertProfile = () => {
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
        console.error("Failed to fetch expert", error);
      }
    };

    fetchExpert();
  }, []);

  if (!expert) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded shadow-lg mt-8">
      <div className="flex items-center mb-6">
        <img
          className="w-32 h-32 object-cover rounded-full mr-6"
          src={expert.avatar}
          alt={`${expert.name}'s avatar`}
        />

        <div>
          <h1 className="text-3xl font-bold">{expert.name}</h1>
          <p className="text-gray-300">
            {expert.jobTitle || "No job title provided"}
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
    </div>
  );
};

export default ExpertProfile;
