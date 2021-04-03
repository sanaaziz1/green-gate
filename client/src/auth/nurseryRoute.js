import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isNurseryAuthenticated } from "../atoms/auth";

function NurseryPrivateRoute({ component: Component, ...rest }) {
	const isAuthenticated = useRecoilValue(isNurseryAuthenticated);

	return (
		<Route
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/nursery/sign-in" />
				)
			}
			{...rest}
		/>
	);
}

export default NurseryPrivateRoute;
