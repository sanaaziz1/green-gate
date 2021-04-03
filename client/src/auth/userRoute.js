import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAuthenticated } from "../atoms/auth";

function UserPrivateRoute({ component: Component, ...rest }) {
	const isAuthenticated = useRecoilValue(isUserAuthenticated);

	return (
		<Route
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/user/sign-in" />
				)
			}
			{...rest}
		/>
	);
}

export default UserPrivateRoute;
