import { useSetRecoilState } from "recoil";
import { authToken } from "../atoms/auth";

const useSignOut = () => {
	localStorage.removeItem("authToken");
	useSetRecoilState(authToken)(null);
};
export default useSignOut;
