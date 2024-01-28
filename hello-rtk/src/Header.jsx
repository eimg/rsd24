import { useContext } from "react";
import { ThemeContext } from "./Theme";

import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import {
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
	Checklist as ChecklistIcon,
	DeleteSweep as ClearAllIcon,
} from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { clear } from "./app/todoSlice";

export default function Header() {
    const { mode, setMode } = useContext(ThemeContext);
    const list = useSelector(state => state.todo.items);

    const dispatch = useDispatch();

	return (
		<AppBar position="static">
			<Toolbar>
				<Badge
					badgeContent={list.filter(item => !item.done).length}
					color="error">
					<ChecklistIcon />
				</Badge>
				<Typography
					variant="h6"
					sx={{ ml: 3, flexGrow: 1 }}>
					Checklist
				</Typography>
				<>
					{mode === "dark" ? (
						<IconButton
							color="inherit"
							onClick={() => {
								setMode("light");
							}}>
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton
							color="inherit"
							onClick={() => {
								setMode("dark");
							}}>
							<DarkModeIcon />
						</IconButton>
					)}
                    
					<IconButton
						onClick={() => {
                            dispatch( clear() );
                        }}
						color="inherit">
						<ClearAllIcon />
					</IconButton>
				</>
			</Toolbar>
		</AppBar>
	);
}
