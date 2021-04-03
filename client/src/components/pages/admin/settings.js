import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import GGClient from "../../../api/GGClient";
import { normalizeFD } from "../../../api/utils";

function AdminUpdateSettings() {
	const [feedback, setFeedback] = useState();
	const [settings, setSettings] = useState();

	let { id } = useParams();

	const updateSettings = useCallback(async (e) => {
		e.preventDefault();
		const $form = e.target;
		const { data } = await GGClient.post(
			`/admin/settings/update`,
			normalizeFD(new FormData($form))
		);
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
	}, []);

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get(`/admin/settings`);
			if (data.success) {
				const s = data.data;
				setSettings(s);
			} else {
				setSettings(false);
			}
		})();
	}, [id]);

	const changeField = (e) => {
		setSettings({ ...settings, [e.target.name]: e.target.value });
	};

	return (
		<Row>
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				{settings && (
					<>
						<h1 className="text-center mb-5">Update Settings</h1>
						{feedback && (
							<Alert
								variant={
									feedback.type === "err" ? "danger" : "info"
								}
							>
								{feedback.message}
							</Alert>
						)}
						<Form
							method="POST"
							encType="multipart/form-data"
							onSubmit={updateSettings}
						>
							<Form.Group controlId="title">
								<Form.Label>Title*</Form.Label>
								<Form.Control
									value={settings.title}
									required
									name="title"
									onChange={changeField}
								/>
							</Form.Group>

							<Form.Group controlId="description">
								<Form.Label>Description*</Form.Label>
								<Form.Control
									value={settings.description}
									required
									name="description"
									onChange={changeField}
									as="textarea"
									rows={4}
								/>
							</Form.Group>

							<Form.Group controlId="about">
								<Form.Label>About Us</Form.Label>
								<Form.Control
									value={settings.about}
									required
									name="about"
									onChange={changeField}
									as="textarea"
									rows={6}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</>
				)}
			</Col>
		</Row>
	);
}

export default AdminUpdateSettings;
