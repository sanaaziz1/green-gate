import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

import GGClient from "../../../api/GGClient";

function NurseryCreateProduct() {
	const [feedback, setFeedback] = useState();

	const createProduct = useCallback(async (e) => {
		e.preventDefault();
		const $form = e.target;
		let formData = new FormData($form);

		const { data } = await GGClient.post(
			"/nursery/products/create",
			formData
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
		$form.reset();
	}, []);

	return (
		<div>
			<Row>
				<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
					<h1 className="text-center mb-5">Create Product</h1>
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
						onSubmit={createProduct}
					>
						<Form.Group controlId="name">
							<Form.Label>Name*</Form.Label>
							<Form.Control
								placeholder="e.g. Plant X2Y"
								required
								name="name"
							/>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description*</Form.Label>
							<Form.Control
								required
								name="description"
								as="textarea"
								rows={6}
							/>
						</Form.Group>

						<Form.Group controlId="picture">
							<Form.Label>Picture*</Form.Label>
							<Form.Control type="file" required name="picture" />
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

export default NurseryCreateProduct;
