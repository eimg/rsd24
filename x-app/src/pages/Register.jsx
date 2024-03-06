import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useUIState } from "../providers/UIStateProvider";

export default function Register() {
	const nameRef = useRef();
	const handleRef = useRef();
	const profileRef = useRef();
	const passwordRef = useRef();

    const navigate = useNavigate();

    const { setFeedbackMessage, setOpenFeedback } = useUIState();

	const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

	return (
		<Box>
			<Typography variant="h4">Register</Typography>
			<Box sx={{ mt: 4 }}>
				<form
					onSubmit={e => {
						e.preventDefault();
						const name = handleRef.current.value;
						const handle = handleRef.current.value;
						const profile = handleRef.current.value;
						const password = passwordRef.current.value;

						if (!name || !handle || !password) {
							setHasError(true);
							return false;
						}

						(async () => {
							const api = import.meta.env.VITE_API_URL;
							const res = await fetch(`${api}/users`, {
								method: "POST",
								body: JSON.stringify({
									name,
									handle,
									profile,
									password,
								}),
								headers: {
									"Content-Type": "application/json",
								},
							});

							if (!res.ok) {
								setErrorMessage(
									"something wrong, please try again"
								);
								setHasError(true);
								return false;
							}

                            setFeedbackMessage("Account created");
                            setOpenFeedback(true);
							navigate("/login");
						})();
					}}>
					{hasError && (
						<Alert
							severity="warning"
							sx={{ mb: 4 }}>
							{errorMessage}
						</Alert>
					)}

					<TextField
						label="Name"
						fullWidth
						sx={{ mb: 2 }}
						inputRef={nameRef}
					/>
					<TextField
						label="Handle"
						fullWidth
						sx={{ mb: 2 }}
						inputRef={handleRef}
					/>
					<TextField
						label="Profile/Bio"
						fullWidth
						sx={{ mb: 2 }}
						inputRef={profileRef}
					/>
					<TextField
						label="Password"
						fullWidth
						type="password"
						sx={{ mb: 2 }}
						inputRef={passwordRef}
					/>
					<Button
						type="submit"
						variant="contained"
						fullWidth>
						Register
					</Button>
				</form>
				<Button
					variant="text"
					sx={{ mt: 2 }}
					fullWidth
					onClick={() => {
						navigate("/login");
					}}>
					Login
				</Button>
			</Box>
		</Box>
	);
}
