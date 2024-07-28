import React from 'react';
import { Link } from 'react-router-dom';

const ExpertCard = ({ expert}) => {
  return (
    <div className="w-64 rounded overflow-hidden shadow-lg bg-gray-800 text-white p-4 m-4">
      <Link to={`/expert/${expert._id}`}>
        <img className="w-48 h-48 rounded-[50%] object-cover" src={expert.avatar} alt={`${expert.name}'s avatar`} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{expert.name}</div>
          <p className="text-gray-300 text-base">{expert.jobTitle || "No job title provided"}</p>
          <p className="text-gray-300 text-base">Expertise: {expert.expertise}</p>
          <p className="text-gray-300 text-base">Field: {expert.field}</p>
        </div>
      </Link>
    </div>
  );
};

export default ExpertCard;


