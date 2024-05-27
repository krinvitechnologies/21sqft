import axios from "axios";
import { BASE_URL } from "./helper.js"; // Importing BASE_URL from helper.js

axios.defaults.withCredentials = true;
// Set up axios instance with common configurations
export const axiosRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Common configuration for withCredentials
    // timeout: 5000, // Setting request timeout to 5 seconds
});

export default axiosRequest;
