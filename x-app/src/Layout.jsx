import { Outlet } from "react-router-dom";

import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";

import { Box, Container } from "@mui/material";

export default function Layout() {
	return (
		<Box>
			<AppDrawer />
			<Header />
			<Container maxWidth="sm" sx={{ mt: 4 }}>
				<Outlet />
			</Container>
		</Box>
	);
}
