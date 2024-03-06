import { Outlet } from "react-router-dom";

import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";

import { Alert, Box, Container, Snackbar, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useUIState } from "./providers/UIStateProvider";

export default function Layout() {
	const { openFeedback, setOpenFeedback, feedbackMessage } = useUIState();

	return (
		<Box>
			<AppDrawer />
			<Header />
			<Container
				maxWidth="sm"
				sx={{ mt: 4 }}>
				<Outlet />
				<Fab
					color="success"
					sx={{ position: "fixed", bottom: 40, right: 40 }}>
					<AddIcon />
				</Fab>
			</Container>

			<Snackbar
				open={openFeedback}
				autoHideDuration={4000}
				onClose={() => {
					setOpenFeedback(false);
				}}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}>
				<Alert
					severity="info"
					variant="filled"
					sx={{ width: "100%" }}>
					{feedbackMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
}
