import Header from "./Header";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Template({ list, clear }) {
	return (
		<div role="main">
			<Header
				count={list.filter(item => !item.done).length}
                clear={clear}
			/>
            <Container sx={{ mt: 4 }} maxWidth="sm">
                <Outlet />
            </Container>
		</div>
	);
}
