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
} from "@mui/material";

import {
    MoreVert as MenuIcon,
    FavoriteBorder as LikeIcon,
    Favorite as LikedIcon,
    Comment as CommentIcon,
} from "@mui/icons-material";

import { blue, green, pink, grey } from "@mui/material/colors";

import { format } from "date-fns";

import { useAuth } from "../providers/AuthProvider";

export default function PostCard({ post }) {
	const { auth, authUser } = useAuth();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 3,
						}}>
						<Avatar
							sx={{
								width: 75,
								height: 75,
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
									- {format(post.created, "MMM d, Y")}
								</Typography>
							</Box>
							<Typography sx={{ color: grey[500], fontSize: 16 }}>
								{post.owner.handle}
							</Typography>
						</Box>
					</Box>
					<IconButton>
						<MenuIcon />
					</IconButton>
				</Box>
				<CardActionArea>
					<Typography sx={{ py: 2, px: 1 }}>{post.body}</Typography>
				</CardActionArea>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
					}}>
					<ButtonGroup>
						<IconButton>
							{auth && post.likes ? (
								post.likes.find(
									like => like === authUser._id
								) ? (
									<LikedIcon sx={{ color: pink[500] }} />
								) : (
									<LikeIcon sx={{ color: pink[500] }} />
								)
							) : (
								<LikeIcon sx={{ color: pink[500] }} />
							)}
						</IconButton>

						<Button variant="text">
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
