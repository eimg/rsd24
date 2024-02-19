import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useRef, useState } from "react";

import { Link } from "react-router-dom";

export default function Login() {
    const handleRef = useRef();
    const passwordRef = useRef();

    const [hasError, setHasError] = useState(false);

	return (
		<Box>
			<Typography variant="h4">Login</Typography>
			<Box sx={{ mt: 4 }}>
				<form
					onSubmit={e => {
						e.preventDefault();
						const handle = handleRef.current.value;
						const password = passwordRef.current.value;

						if (!handle || !password) {
							setHasError(true);
						} else {
							setHasError(false);
						}

						return false;
					}}>
					{hasError && (
						<Alert
							severity="warning"
							sx={{ mb: 4 }}>
							handle or password required
						</Alert>
					)}

					<TextField
						label="Handle"
						fullWidth
						sx={{ mb: 2 }}
						inputRef={handleRef}
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
						Login
					</Button>
				</form>
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<Link to="/register">Register</Link>
				</Box>
			</Box>
		</Box>
	);
}
