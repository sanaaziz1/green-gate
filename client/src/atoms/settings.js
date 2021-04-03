import { atom } from "recoil";
import GGClient from "../api/GGClient";

export const settingsState = atom({
	key: "settingsState",
	default: new Promise((res, rej) => {
		GGClient.get("/settings").then((settingsRes) => {
			if (settingsRes.data.success) {
				res(settingsRes.data.data);
			} else {
				rej(false);
			}
		});
	}),
});
