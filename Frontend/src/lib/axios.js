//  import axios from "axios";

// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // send cookies with the request
// });
import axios from "axios";
import { API_BASE_URL } from "../constants";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies with the request
});
