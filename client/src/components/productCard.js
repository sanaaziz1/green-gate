import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { uploadsUrl } from "../api/utils";

function ProductCard({ product }) {
	return (
		<Col md={4}>
			<Card>
				<Card.Img variant="top" src={uploadsUrl(product.picture)} />
				<Card.Body>
					<Card.Title>{product.name}</Card.Title>
					<Card.Text>
						<strong>Seller:</strong> {product.nursery.name}
					</Card.Text>
					<Button
						as={Link}
						to={`/products/${product._id}`}
						variant="primary"
					>
						Read more
					</Button>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default ProductCard;
