import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import GGClient from "../../../api/GGClient";

function UserSignUp() {
	const [feedback, setFeedback] = useState();
	const history = useHistory();

	const signUp = useCallback(
		async (e) => {
			e.preventDefault();
			const $form = e.target;
			let formData = {};
			new FormData($form).forEach((val, key) => (formData[key] = val));

			const { data } = await GGClient.post(
				"/user/auth/sign-up",
				formData
			);
			if (data.success) {
				setFeedback({
					type: "msg",
					message: data.message,
				});
				setTimeout(() => {
					history.push("/user/sign-in");
				}, 2000);
			} else {
				setFeedback({
					type: "err",
					message: data.message,
				});
			}
			$form.reset();
		},
		[history]
	);

	return (
		<div>
			<Row>
				<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
					<h1 className="text-center p-3">Sign up as User</h1>
					{feedback && (
						<Alert
							variant={
								feedback.type === "err" ? "danger" : "info"
							}
						>
							{feedback.message}
						</Alert>
					)}

					<Form action="POST" onSubmit={signUp}>
						<Form.Group controlId="name">
							<Form.Label>Name*</Form.Label>
							<Form.Control
								type="text"
								placeholder="User Name"
								required
								name="name"
							/>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>Email*</Form.Label>
							<Form.Control
								type="email"
								placeholder="e.g. user@mail.com"
								required
								name="email"
							/>
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>Password*</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								required
								minLength={5}
								name="password"
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

export default UserSignUp;
