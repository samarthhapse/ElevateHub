import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:5000/api/v1/expert";

export const expertRegister = (data) => axios.post(`${API_URL}/register`, data);

export const expertLogin = (data) => axios.post(`${API_URL}/login`, data);

export const expertChangePassword = (data) =>
  axios.post(`${API_URL}/resetpassword`, data);

export const getExpertDetails = (id) => axios.get(`${API_URL}/${id}`);

export const getAllExperts = () => axios.get(`${API_URL}/`);

export const updateExpertDetails = (token, data) =>
  axios.patch(
    `${API_URL}/update`,
    { updatedData: data },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
    }
  );
