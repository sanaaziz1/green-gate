import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function NurseryDashboard() {
	return (
		<div>
			<h1 className="text-center">Nursery Dashboard.</h1>
			<ListGroup className="py-4">
				<ListGroup.Item>
					<Link to="/nursery/chat">Messages</Link>
				</ListGroup.Item>
				<ListGroup.Item>
					<Link to="/nursery/products">Manage Products</Link>
				</ListGroup.Item>
				<ListGroup.Item>
					<Link to="/nursery/profile">Update Profile</Link>
				</ListGroup.Item>
			</ListGroup>
			<div className="text-center mt-4">
				<Link to="/nursery/sign-out">Logout</Link>
			</div>
		</div>
	);
}

export default NurseryDashboard;
