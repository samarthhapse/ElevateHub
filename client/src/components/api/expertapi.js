import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:5000/api/v1/expert";

export const expertRegister = (data) =>
    axios.post(`${API_URL}/register`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const expertLogin = async (data) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/api/v1/expert/login",
            data
        );
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw new Error("Network Error");
        }
    }
};

export const expertChangePassword = (data) =>
    axios.post(`${API_URL}/resetpassword`, data);

export const getExpertDetails = (id) => axios.get(`${API_URL}/${id}`);

export const getAllExperts = () => axios.get(`${API_URL}/`);

export const updateExpertDetails = (token, data) =>
axios.post(
    `${API_URL}/update`,
    { updatedData: data },
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: token,
        },
    }
);
