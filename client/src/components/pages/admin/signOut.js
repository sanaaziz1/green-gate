import React from "react";
import { Redirect } from "react-router";
import useSignOut from "../../../hooks/useSignOut";

function AdminSignOut() {
	useSignOut();
	return <Redirect to="/" />;
}

export default AdminSignOut;
