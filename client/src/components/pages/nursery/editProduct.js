import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import GGClient from "../../../api/GGClient";
import { uploadsUrl } from "../../../api/utils";

function NurseryEditProduct() {
	const [feedback, setFeedback] = useState();
	const [product, setProduct] = useState();

	let { id } = useParams();

	const updateProduct = useCallback(
		async (e) => {
			e.preventDefault();
			const $form = e.target;
			let formData = new FormData($form);

			const { data } = await GGClient.post(
				`/nursery/products/${id}`,
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
		},
		[id]
	);

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get(`/nursery/products/${id}`);
			if (data.success) {
				const p = data.data;
				setProduct(p);
			} else {
				setProduct(false);
			}
		})();
	}, [id]);

	const changeField = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	return (
		<Row>
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				{product === false && (
					<p className="text-center">No product found.</p>
				)}
				{product && (
					<>
						<h1 className="text-center mb-5">Edit Product</h1>
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
							onSubmit={updateProduct}
						>
							<Form.Group controlId="name">
								<Form.Label>Name*</Form.Label>
								<Form.Control
									value={product.name}
									required
									name="name"
									onChange={changeField}
								/>
							</Form.Group>

							<Form.Group controlId="description">
								<Form.Label>Description*</Form.Label>
								<Form.Control
									value={product.description}
									required
									name="description"
									onChange={changeField}
									as="textarea"
									rows={6}
								/>
							</Form.Group>

							<Form.Group controlId="picture">
								<Row>
									<Col md={6}>
										<Form.Label>Picture*</Form.Label>
										<Form.Control
											type="file"
											name="picture"
										/>
									</Col>

									<img
										src={uploadsUrl(product.picture)}
										alt=""
										height={80}
									/>
								</Row>
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

export default NurseryEditProduct;
