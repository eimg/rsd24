import { AppBar, Toolbar, IconButton, Box, Badge } from "@mui/material";

import {
	Menu as MenuIcon,
	X as XIcon,
	Notifications as NotiIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	ArrowBack as BackIcon,
	People as UsersIcon,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

import { useUIState } from "../providers/UIStateProvider";
import { useAppTheme } from "../providers/AppThemeProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";

export default function Header() {
	const { setOpenDrawer, notiCount, setNotiCount } = useUIState();
	const { mode, setMode } = useAppTheme();

	const { auth } = useAuth();

	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const api = import.meta.env.VITE_API_URL;
		const token = localStorage.getItem("token");

		(async () => {
			const res = await fetch(`${api}/notis`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const notis = await res.json();
			const count = auth ? notis.filter(noti => !noti.read).length : 0;
			setNotiCount(count);
		})();

	}, [auth, notiCount]);

	return (
		<AppBar position="static">
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}>
				{pathname === "/" ? (
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => {
							setOpenDrawer(true);
						}}>
						<MenuIcon />
					</IconButton>
				) : (
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => {
							navigate(-1);
						}}>
						<BackIcon />
					</IconButton>
				)}
				<IconButton
					color="inherit"
					onClick={() => {
						navigate("/");
					}}>
					<XIcon />
				</IconButton>
				<Box>
					<IconButton
						color="inherit"
						sx={{ mr: 1 }}
                        onClick={() => {
                            navigate("/search");
                        }}>
						<UsersIcon />
					</IconButton>
					{mode === "dark" ? (
						<IconButton
							color="inherit"
							onClick={() => setMode("light")}>
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton
							color="inherit"
							onClick={() => setMode("dark")}>
							<DarkModeIcon />
						</IconButton>
					)}
					<IconButton
						color="inherit"
						edge="end"
						onClick={() => {
							navigate("/notis");
						}}>
						<Badge
							badgeContent={notiCount}
							color="error">
							<NotiIcon />
						</Badge>
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
