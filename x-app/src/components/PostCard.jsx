import {
	Box,
	Typography,
	Card,
	CardContent,
	CardActionArea,
	IconButton,
	Button,
	ButtonGroup,
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

import {
	MoreVert as MenuIcon,
	Comment as CommentIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";

import { blue, green, grey } from "@mui/material/colors";

import { format } from "date-fns";

import { useNavigate } from "react-router-dom";

import LikeButton from "./LikeButton";
import { useState } from "react";

export default function PostCard({ post, like, unlike, focus }) {
	const navigate = useNavigate();

	const [showMenu, setShowMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState(null);

	const photo = `${import.meta.env.VITE_PROFILE_PHOTOS}/${
		post.owner.profile
	}`;

	return (
		<Card
			variant="outlined"
			sx={{ mb: 2, bgcolor: focus ? "post.background" : "transparent" }}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}>
					<CardActionArea
						onClick={() => {
							navigate(`/profile/${post.owner._id}`);
						}}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
							gap: 2,
						}}>
						<Avatar
							src={photo}
							sx={{
								width: 64,
								height: 64,
								background: blue[500],
							}}>
							P
						</Avatar>
						<Box>
							<Box
								sx={{
									display: "flex",
									gap: 1,
									alignItems: "center",
								}}>
								<Typography>{post.owner.name}</Typography>
								<Typography
									sx={{
										color: green[500],
										fontSize: 14,
									}}>
									• {format(post.created, "MMM d, y")}
								</Typography>
							</Box>
							<Typography sx={{ color: grey[500], fontSize: 14 }}>
								@{post.owner.handle}
							</Typography>
						</Box>
					</CardActionArea>
					<Box>
						<IconButton
							onClick={e => {
								setShowMenu(true);
								setMenuPosition(e.currentTarget);
							}}>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={menuPosition}
							open={showMenu}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							onClose={() => {
								setShowMenu(false);
							}}>
							<MenuItem>
								<ListItemIcon>
									<DeleteIcon color="error" />
								</ListItemIcon>
								<ListItemText primary="Delete" />
							</MenuItem>
						</Menu>
					</Box>
				</Box>
				<CardActionArea
					onClick={() => {
						navigate(`/posts/${post._id}`);
					}}>
					<Typography
						sx={{
							py: 2,
							px: 1,
							fontSize: focus ? "1.6em" : "1.2em",
						}}>
						{post.body}
					</Typography>
				</CardActionArea>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
					}}>
					<ButtonGroup>
						<LikeButton
							post={post}
							like={like}
							unlike={unlike}
						/>
						<Button
							variant="text"
							onClick={() => {
								navigate(`/likes/${post._id}`);
							}}>
							{post.likes ? post.likes.length : 0}
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton>
							<CommentIcon sx={{ color: blue[500] }} />
						</IconButton>
						<Button variant="text">
							{post.comments ? post.comments.length : 0}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
