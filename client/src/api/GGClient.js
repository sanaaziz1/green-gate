import axios from "axios";
import { GGAPI } from "../constants";

const GGClient = axios.create({
	baseURL: GGAPI.BASE_URL,
});

GGClient.interceptors.request.use((config) => {
	const authToken = localStorage.getItem("authToken");
	if (authToken) {
		config.headers.common["Authorization"] = `Bearer ${authToken}`;
	}
	return config;
});

export default GGClient;
