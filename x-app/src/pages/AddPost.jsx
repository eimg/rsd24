import { Button, Input, Box, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUIState } from "../providers/UIStateProvider";

export default function AddPost() {
	const navigate = useNavigate();
	const input = useRef();

    const [hasError, setHasError] = useState();
	const [errorMsessage, setErrorMessage] = useState("rror");

    const { setFeedbackMessage, setOpenFeedback } = useUIState();

	return (
		<Box>
			{hasError && (
				<Alert
					severity="warning"
					sx={{ mb: 4 }}>
					{errorMsessage}
				</Alert>
			)}

			<form
				onSubmit={e => {
					e.preventDefault();

					const body = input.current.value;
					if (!body) return false;

					(async () => {
						const api = import.meta.env.VITE_API_URL;
						const token = localStorage.getItem("token");

						const res = await fetch(`${api}/posts`, {
							method: "POST",
							body: JSON.stringify({ body }),
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						});

						if (!res.ok) {
							setHasError(true);
                            setErrorMessage("Unable to add post");
                            return false;
						}

                        setFeedbackMessage("A new post added");
						setOpenFeedback(true);
						navigate("/");
					})();
				}}>
				<Box sx={{ p: 2, border: 1 }}>
					<Input
						inputRef={input}
						sx={{ fontSize: "16px", py: 2 }}
						placeholder="What's on your mind"
						multiline
						fullWidth
						minRows={4}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						mt: 2,
						justifyContent: "space-between",
					}}>
					<Box></Box>
					<Button
						type="submit"
						size="small"
						variant="contained"
						color="success"
						sx={{ borderRadius: 5 }}>
						Add Post
					</Button>
				</Box>
			</form>
		</Box>
	);
}
