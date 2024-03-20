import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemButton,
	Button,
	ListItemSecondaryAction,
} from "@mui/material";

import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import UserList from "../components/UserList";

export default function Followers() {
	const { id } = useParams();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const api = import.meta.env.VITE_API_URL;
		(async () => {
			const res = await fetch(`${api}/users/followers/${id}`);
            const user = await res.json();
			setUsers(user.followers);
		})();
	}, []);

	return (
		<UserList
			users={users}
			title="Followers"
		/>
	);
}
