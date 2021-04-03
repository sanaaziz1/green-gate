import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import clsx from "clsx";
import GGClient from "../../../api/GGClient";
import { normalizeDateTime, normalizeFD } from "../../../api/utils";
import { authState } from "../../../atoms/auth";
import Loading from "../../loading";

function UserChat() {
	const { nurseryId } = useParams();
	const { sub: userId } = useRecoilValue(authState);
	const [nursery, setNursery] = useState();
	const [user, setUser] = useState();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		(async () => {
			if (nurseryId && userId) {
				const display = await Promise.all([
					await GGClient.get("/display/user/" + userId),
					await GGClient.get("/display/nursery/" + nurseryId),
				]);
				const _user = display[0].data.data;
				const _nursery = display[1].data.data;
				setUser(_user);
				setNursery(_nursery);
			}
		})();
	}, [nurseryId, userId]);

	// get messages
	useEffect(() => {
		(async () => {
			if (nursery) {
				const { data } = await GGClient.get(
					"/user/message/list/" + nursery._id
				);
				setMessages(data.data);
			}
		})();
	}, [nursery]);

	const createMessage = useCallback(
		async (e) => {
			e.preventDefault();
			const $form = e.target;

			const fd = new FormData($form);
			fd.append("nursery", nursery._id);

			const message = normalizeFD(fd);
			setMessages([
				...messages,
				{ from: "user", createdAt: new Date(), ...message },
			]);

			const { data } = await GGClient.post(
				"/user/message/create",
				message
			);

			if (data.success) {
				$form.reset();
			}
		},
		[messages, nursery]
	);

	return nursery && user ? (
		<div>
			<h1 className="text-center">Your chat with {nursery.name}</h1>
			{messages.length ? (
				<ListGroup className="py-4">
					{messages.map((message) => (
						<ListGroup.Item
							className={clsx(
								"mb-2",
								message.from === "user"
									? "bg-secondary"
									: "bg-primary text-light"
							)}
						>
							<div className="d-flex justify-content-between mb-1 font-weight-bold font-italic">
								<div>
									{message.from === "user"
										? "You"
										: nursery.name}
								</div>
								<div>
									{normalizeDateTime(message.createdAt)}
								</div>
							</div>
							<div
								style={{
									whiteSpace: "pre-wrap",
								}}
							>
								{message.content}
							</div>
						</ListGroup.Item>
					))}
				</ListGroup>
			) : (
				<p className="text-center py-2">No chat yet.</p>
			)}
			<br />
			<Form
				onSubmit={createMessage}
				className="d-flex flex-column align-items-center"
			>
				<Form.Group controlId="content" className="w-50">
					<Form.Control
						as="textarea"
						rows={3}
						name="content"
						placeholder="Message ..."
					/>
				</Form.Group>
				<Button type="submit">Send</Button>
			</Form>
		</div>
	) : (
		<Loading />
	);
}

export default UserChat;
