import {
	Box,
	List,
	Avatar,
	ListItem,
	ListItemText,
	OutlinedInput,
	InputAdornment,
	ListItemButton,
	ListItemAvatar,
} from "@mui/material";

import { PersonSearch as PersonSearchIcon } from "@mui/icons-material";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
	const [users, setUsers] = useState([]);

	const navigate = useNavigate();
	const input = useRef();

	return (
		<Box>
			<OutlinedInput
				fullWidth={true}
				inputRef={input}
				variant="outlined"
				placeholder="Search user"
				startAdornment={
					<InputAdornment position="start">
						<PersonSearchIcon />
					</InputAdornment>
				}
				onKeyUp={() => {
					(async () => {
						const api = import.meta.env.VITE_API_URL;
						const q = input.current.value;

						const res = await fetch(`${api}/search/users?q=${q}`);
						if (res.ok) {
							setUsers(await res.json());
						}
					})();
				}}
			/>
			<List>
				{users.map(user => {
					return (
						<ListItem key={user._id}>
							<ListItemButton
								onClick={() => {
									navigate(`/profile/${user._id}`);
								}}>
								<ListItemAvatar>
									<Avatar alt="Profile"></Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={user.name + " @" + user.handle}
									secondary={user.profile}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
