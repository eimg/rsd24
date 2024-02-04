import Header from "./Header";
import { Container, Box, CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Template({ list, clear, isLoading }) {
	return (
		<Box>
			<Header
				count={list.filter(item => !item.done).length}
				clear={clear}
			/>
			<Container
				sx={{ mt: 4 }}
				maxWidth="sm">
				{isLoading ? (
					<Box
						sx={{
							display: "flex",
							height: 200,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<CircularProgress />
					</Box>
				) : (
					<Outlet />
				)}
			</Container>
		</Box>
	);
}
