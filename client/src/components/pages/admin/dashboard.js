import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminDashboard() {
	return (
		<div>
			<h1 className="text-center">Admin Dashboard.</h1>
			<ListGroup className="py-4">
				<ListGroup.Item>
					<Link to="/admin/settings">Website Settings</Link>
				</ListGroup.Item>
			</ListGroup>
			<div className="text-center mt-4">
				<Link to="/admin/sign-out">Logout</Link>
			</div>
		</div>
	);
}

export default AdminDashboard;
