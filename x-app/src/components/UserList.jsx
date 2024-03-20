import {
    Box,
    Typography,
    List,
    ListItem,
    Avatar,
    ListItemText,
    ListItemAvatar
} from "@mui/material";

import { pink } from "@mui/material/colors";

import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

import FollowButton from "./FollowButton";

export default function UserList({ users, title }) {
	const { authUser } = useAuth();

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ textAlign: "center", mb: 3 }}>
				{title}
			</Typography>
			<List>
				{users.map(user => {
					return (
						<ListItem key={user._id}>
							<ListItemAvatar>
								<Link
									to={`/profile/${user._id}`}
									style={{ textDecoration: "none" }}>
									<Avatar sx={{ bgcolor: pink[500] }} />
								</Link>
							</ListItemAvatar>
							<ListItemText
								primary={user.name + " @" + user.handle}
								secondary={user.profile}
							/>

							{user._id !== authUser._id && (
								<FollowButton user={user} />
							)}
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
