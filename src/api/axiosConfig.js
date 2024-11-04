import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const axiosBase = axios.create({
    baseURL: 'https://api.formapp.viewsource.work/api/',
});

export const axiosAuth = (token) => axios.create({
    baseURL: 'https://api.formapp.viewsource.work/api/',
    headers: {
        'Authorization' : token,
        'Content-type': 'application/json'
    }
});