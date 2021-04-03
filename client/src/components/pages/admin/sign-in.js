import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import GGClient from "../../../api/GGClient";
import { normalizeFD } from "../../../api/utils";
import { authToken } from "../../../atoms/auth";

function AdminSignIn() {
	const [feedback, setFeedback] = useState();
	const history = useHistory();
	const setAuthToken = useSetRecoilState(authToken);

	const signIn = useCallback(
		async (e) => {
			e.preventDefault();
			const $form = e.target;

			const { data } = await GGClient.post(
				"/admin/auth/sign-in",
				normalizeFD(new FormData($form))
			);
			if (data.success) {
				const token = data.data;
				setAuthToken(token);
				localStorage.setItem("authToken", token);
				history.push("/admin/dashboard");
			} else {
				setFeedback({
					type: "err",
					message: data.message,
				});
			}
			$form.reset();
		},
		[history, setAuthToken]
	);
	return (
		<div>
			<Row>
				<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
					<h1 className="text-center p-3">Admin Sign-in</h1>
					{feedback && (
						<Alert
							variant={
								feedback.type === "err" ? "danger" : "info"
							}
						>
							{feedback.message}
						</Alert>
					)}
					<Form method="POST" onSubmit={signIn}>
						<Form.Group controlId="email">
							<Form.Label>Email*</Form.Label>
							<Form.Control
								type="email"
								placeholder="e.g. ahmed@mail.com"
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

export default AdminSignIn;
