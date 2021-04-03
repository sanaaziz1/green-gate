import React from "react";
import { Redirect } from "react-router";
import useSignOut from "../../../hooks/useSignOut";

function NurserySignOut() {
	useSignOut();
	return <Redirect to="/nursery/sign-in" />;
}

export default NurserySignOut;
