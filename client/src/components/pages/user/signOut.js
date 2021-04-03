import React from "react";
import { Redirect } from "react-router";
import useSignOut from "../../../hooks/useSignOut";

function UserSignOut() {
	useSignOut();
	return <Redirect to="/user/sign-in" />;
}

export default UserSignOut;
