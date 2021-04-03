import React, { useState } from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import GGClient from "../../../api/GGClient";
import { authState } from "../../../atoms/auth";
import Loading from "../../loading";

function NurseryChats() {
	const { sub: nurseryId } = useRecoilValue(authState);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		(async () => {
			if (nurseryId) {
				const { data } = await GGClient.get("/nursery/message/list");
				setUsers(data.data);
			}
		})();
	}, [nurseryId]);

	return users ? (
		<div>
			<h1 className="text-center">Messages</h1>
			{users.length ? (
				<ListGroup className="py-4">
					{users.map((user) => (
						<ListGroup.Item>
							<Link to={`/nursery/chat/${user._id}`}>
								{user.name}
							</Link>
						</ListGroup.Item>
					))}
				</ListGroup>
			) : (
				<p className="text-center py-2">No chat yet.</p>
			)}
		</div>
	) : (
		<Loading />
	);
}

export default NurseryChats;
