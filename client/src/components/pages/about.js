import React from "react";
import { useRecoilValue } from "recoil";
import { settingsState } from "../../atoms/settings";

function About() {
	const settings = useRecoilValue(settingsState);
	return (
		<div>
			{settings.about ? (
				<div dangerouslySetInnerHTML={{ __html: settings.about }} />
			) : (
				<h1 className="text-center">Coming soon.</h1>
			)}
		</div>
	);
}

export default About;
