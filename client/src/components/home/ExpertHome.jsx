import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../Basic/Input";
import { updateExpertDetails } from "../api/expertapi";
import { setExpertData } from "../../redux/expertSlice";
import { useDispatch } from "react-redux";

const ExpertHome = () => {
  const token = useSelector((state) => state.expert.authToken);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.expert.expertData) || {};
  const [inputs, setInputs] = useState({
    name: data.name,
    field: data.field,
    jobTitle: data.jobTitle,
  });
  const [expertise, setExpertise] = useState(data.expertise || "");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const editClick = () => {
    setEditMode(true);
  };
  const saveClick = async () => {
    setLoading(true);

    if (Object.values(inputs).some((value) => value === "")) {
      setError("all fields are required");
      setLoading(false);
      return;
    }
    const userData = { ...inputs, expertise };
    const response = await updateExpertDetails(token, userData).catch((err) => {
      console.log(err.response);
      setError(err.response.data.message);
      setLoading(false);
      return;
    });
    const updatedData = response.data.user;

    dispatch(setExpertData(updatedData));
    setEditMode(false);
    setLoading(false);
  };
  return (
    <div className="w-4/5 m-auto border rounded-md ">
      <div className="flex flex-wrap p-10 gap-6 justify-evenly">
        {Object.keys(inputs).map((input) => (
          <Input
            key={input}
            value={inputs[input]}
            onChange={handleChange}
            label={input}
            readonly={!editMode}
          />
        ))}
        <div className="flex flex-col ">
          <label htmlFor="expertise" className="text-xl">
            expertise
          </label>
          <select
            className=" w-72 h-12 py-6 px-2 rounded-md"
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            name="expertise"
            disabled={!editMode}
          >
            <option value="Bug solving">Bug solving</option>
            <option value="Tech career assistance">
              Tech career assistance
            </option>
            <option value="Academic support">Academic support</option>
          </select>
        </div>
      </div>
      {error && (
        <div className=" w-full text-center">
          <p className=" text-red-600 ">{error}</p>
        </div>
      )}
      {editMode ? (
        <button
          className="w-40 h-10 rounded-md bg-green-500  mx-6 mb-4"
          disabled={loading}
          onClick={saveClick}
        >
          Save
        </button>
      ) : (
        <button
          className="w-40 h-10 rounded-md bg-blue-500 mx-6 mb-4"
          onClick={editClick}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default ExpertHome;
