import React, { useState } from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import GGClient from "../../../api/GGClient";
import { authState } from "../../../atoms/auth";
import Loading from "../../loading";

function UserChats() {
	const { sub: userId } = useRecoilValue(authState);
	const [nurseries, setNurseries] = useState([]);

	useEffect(() => {
		(async () => {
			if (userId) {
				const { data } = await GGClient.get("/user/message/list");
				setNurseries(data.data);
			}
		})();
	}, [userId]);

	return nurseries ? (
		<div>
			<h1 className="text-center">Messages</h1>
			{nurseries.length ? (
				<ListGroup className="py-4">
					{nurseries.map((nursery) => (
						<ListGroup.Item>
							<Link to={`/user/chat/${nursery._id}`}>
								{nursery.name}
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

export default UserChats;
