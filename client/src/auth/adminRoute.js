import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAdminAuthenticated } from "../atoms/auth";

function AdminPrivateRoute({ component: Component, ...rest }) {
	const isAuthenticated = useRecoilValue(isAdminAuthenticated);

	return (
		<Route
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/admin/sign-in" />
				)
			}
			{...rest}
		/>
	);
}

export default AdminPrivateRoute;
