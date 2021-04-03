import { atom, selector } from "recoil";
import jwt_decode from "jwt-decode";

const tokenToAuthState = (token) => {
	if (!token) return null;
	try {
		return jwt_decode(token);
	} catch {
		return null;
	}
};

export const authToken = atom({
	key: "authToken",
	default: localStorage.getItem("authToken"),
});

export const authState = selector({
	key: "authState",
	get: ({ get }) => {
		return tokenToAuthState(get(authToken));
	},
});

export const isNurseryAuthenticated = selector({
	key: "isNurseryAuthenticated",
	get: ({ get }) => {
		const token = get(authState);
		if (!token) return false;

		return token.userType === "nursery";
	},
});

export const isUserAuthenticated = selector({
	key: "isUserAuthenticated",
	get: ({ get }) => {
		const token = get(authState);
		if (!token) return false;

		return token.userType === "user";
	},
});

export const isAdminAuthenticated = selector({
	key: "isAdminAuthenticated",
	get: ({ get }) => {
		const token = get(authState);
		if (!token) return false;

		return token.userType === "admin";
	},
});
