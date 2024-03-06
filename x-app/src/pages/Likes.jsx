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

export default function Likes() {
    const { id } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const api = import.meta.env.VITE_API_URL;
        (async () => {
            const res = await fetch(`${api}/users/likes/${id}`);
            setUsers(await res.json());
        })();
    }, []);

	return (
		<List>
			{users.map(user => {
                return (
					<ListItem>
						<ListItemAvatar>
							<Avatar
								sx={{
									width: 64,
									height: 64,
									background: blue[500],
								}}>
								{user.name[0]}
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							sx={{ ml: 3 }}
							primary={user.name}
							secondary={
								(user.followers ? user.followers.length : 0) +
								" Followers"
							}
						/>
						<ListItemSecondaryAction>
							<Button
								size="small"
								variant="outlined"
								sx={{ borderRadius: 10 }}>
								Follow
							</Button>
						</ListItemSecondaryAction>
					</ListItem>
				);
            })}
		</List>
	);
}
