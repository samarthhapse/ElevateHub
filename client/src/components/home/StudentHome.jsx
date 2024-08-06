import React, { useEffect, useState } from "react";
// import ExpertiseCard from "./studentHome/ExpertiseCard";
import ExpertCard from "./studentHome/ExpertCard";
import  CustomButton  from "../meetings/Button";
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

 

  return (
    <>
      <CustomButton />
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
          <ExpertCard expert={expert} key={expert._id}  />
        ))}
      </div>
    </>
  );
};

export default StudentHome;


