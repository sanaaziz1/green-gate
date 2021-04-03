import React from "react";
import { Ellipsis } from "react-css-spinners";

function Loading() {
	return (
		<div className="text-center p-4 w-100">
			<Ellipsis color="#3d3d3d" />
		</div>
	);
}

export default Loading;
