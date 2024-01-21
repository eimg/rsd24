import { useContext } from "react";
import { AppContext } from "./App";

export default function Title() {
	const { title } = useContext(AppContext);

	return (
		<h1
			style={{
				fontFamily: "roboto, arial",
				padding: 0,
			}}>
			{ title }
		</h1>
	);
}
