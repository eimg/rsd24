import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import {
	Checklist as ChecklistIcon,
	DeleteSweep as ClearAllIcon,
} from "@mui/icons-material";

export default function Header({ count, clear }) {
	return (
		<AppBar position="static">
			<Toolbar>
				<Badge badgeContent={count} color="error">
					<ChecklistIcon />
				</Badge>
				<Typography
					variant="h6"
					sx={{ ml: 3, flexGrow: 1 }}>
					Checklist
				</Typography>
				<IconButton onClick={clear} color="inherit">
					<ClearAllIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
