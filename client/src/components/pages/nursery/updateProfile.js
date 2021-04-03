import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

import GGClient from "../../../api/GGClient";

function UpdateProfile() {
	const [feedback, setFeedback] = useState();
	const [profile, setProfile] = useState();

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get("/nursery/profile");
			if (data.success) {
				setProfile(data.data);
			}
		})();
	}, []);

	const updateProfile = useCallback(
		async (e) => {
			e.preventDefault();

			const { data } = await GGClient.post("/nursery/profile", profile);
			if (data.success) {
				setFeedback({
					type: "msg",
					message: data.message,
				});
			} else {
				setFeedback({
					type: "err",
					message: data.message,
				});
			}
		},
		[profile]
	);

	const changeField = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<Row>
				<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
					<h1 className="text-center mb-5">Update Profile</h1>
					{feedback && (
						<Alert
							variant={
								feedback.type === "err" ? "danger" : "info"
							}
						>
							{feedback.message}
						</Alert>
					)}
					<Form method="POST" onSubmit={updateProfile}>
						<Form.Group controlId="name">
							<Form.Label>Name*</Form.Label>
							<Form.Control
								value={profile?.name}
								required
								name="name"
								onChange={changeField}
							/>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>Email*</Form.Label>
							<Form.Control
								type="email"
								value={profile?.email}
								required
								name="email"
								onChange={changeField}
							/>
						</Form.Group>

						<Form.Group controlId="location">
							<Form.Label>Location*</Form.Label>
							<Form.Control
								value={profile?.location}
								required
								name="location"
								onChange={changeField}
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</div>
	);
}

export default UpdateProfile;
