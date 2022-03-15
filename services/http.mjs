import axios from "axios";
import { BASE_URL } from "../config/index.mjs";

export const http = axios.create({
  baseURL: `${BASE_URL}/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});
