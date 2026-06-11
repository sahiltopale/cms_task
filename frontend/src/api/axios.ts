import axios from "axios";

const api = axios.create({
  baseURL: "https://cms-task-bsz7.onrender.com",
});

export default api;
