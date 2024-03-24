import { useRef, useState } from "react";

import { toCelsius } from "../utils/converter";

export default function App() {
    const inputRef = useRef();
    const [result, setResult] = useState();

    return (
		<div>
			<h1 role="title">TDD</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
					const f = inputRef.current.value;
                    setResult(toCelsius(f));
				}}>
				<input type="text" role="input" ref={inputRef} />
				<button role="button">Convert</button>
			</form>
			{result && <div role="result">{result}</div>}
		</div>
	);
}