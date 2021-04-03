import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import GGClient from "../../api/GGClient";
import { uploadsUrl } from "../../api/utils";
import { isUserAuthenticated } from "../../atoms/auth";
import Loading from "../loading";

function Product() {
	const [product, setProduct] = useState();
	const _isUserAuthenticated = useRecoilValue(isUserAuthenticated);
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get(`/products/${id}`);
			if (data.success) {
				setProduct(data.data);
			}
		})();
	}, [id]);

	if (!product) return <Loading />;

	return (
		<Row className="py-4 bg-white">
			<Col md={6}>
				<Image src={uploadsUrl(product.picture)} alt="" fluid />
			</Col>
			<Col>
				<h1 className="display-5">{product.name}</h1>
				<div className="py-3">
					<h4>Seller:</h4>
					<h4>
						Name — {product.nursery.name} <br />
						Address — {product.nursery.location} <br />
						Contact — {product.nursery.email} <br />
					</h4>
					<div
						className="py-3"
						dangerouslySetInnerHTML={{
							__html: product.description,
						}}
					/>
					{_isUserAuthenticated ? (
						<Button
							as={Link}
							to={`/user/chat/${product.nursery._id}/`}
						>
							Chat with Nursery
						</Button>
					) : (
						<Button as={Link} to="/user/sign-in">
							Sign in to Chat
						</Button>
					)}
				</div>
			</Col>
		</Row>
	);
}

export default Product;
