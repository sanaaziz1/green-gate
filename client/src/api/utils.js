import { GGAPI } from "../constants";

export const uploadsUrl = (name) => {
	return `${GGAPI.BASE_URL}uploads/${name}`;
};

export const normalizeFD = (fd) => {
	let formData = {};
	fd.forEach((val, key) => (formData[key] = val));
	return formData;
};

export const normalizeDateTime = (date) => {
	return new Date(date).toLocaleString();
};
