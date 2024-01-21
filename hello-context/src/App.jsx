import { createContext, useState } from "react";
import Header from "./Header";

export const AppContext = createContext();

export default function App() {
    const [title, setTitle] = useState('Page Title');

	return (
		<AppContext.Provider value={{ title }}>
			<div
				style={{
					maxWidth: 800,
					margin: "20px auto",
					textAlign: "center",
				}}>
				<Header />
				<button onClick={() => {
                    setTitle('New Title');
                }}>Change Title</button>
			</div>
		</AppContext.Provider>
	);
}
