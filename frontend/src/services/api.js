import axios from "axios";
const api = axios.create({
  baseURL: "https://travelbharat-explore-india-state-by-state.onrender.com",
});

export default api;