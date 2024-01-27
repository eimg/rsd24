import Header from "./Header";
import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Template() {
	return (
		<Box>
			<Header />
            <Container sx={{ mt: 4 }} maxWidth="sm">
                <Outlet />
            </Container>
		</Box>
	);
}
