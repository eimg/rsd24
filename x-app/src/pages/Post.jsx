import {
	Box,
	FormControl,
	Input,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useEffect, useState, useRef } from "react";

import { useAuth } from "../providers/AuthProvider";

import PostCard from "../components/PostCard";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
	const { id } = useParams();

	const input = useRef();
    const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState({});
	const [hasUpdate, setHasUpdate] = useState(false);

	const { authUser } = useAuth();

    const like = _id => {
        post.likes.push(authUser._id);
		setPost({ ...post });
	};

	const unlike = _id => {
		post.likes = post.likes.filter(like => like !== authUser._id);
        setPost({ ...post });
	};

	const remove = _id => {
		navigate("/");
	};

    const commentLike = _id => {
		post.comments = post.comments.map(post => {
			if (post._id === _id) {
				post.likes.push(authUser._id);
			}

			return post;
		});

		setPost({ ...post });
	};

	const commentUnlike = _id => {
		post.comments = post.comments.map(post => {
			if (post._id === _id) {
				post.likes = post.likes.filter(like => like !== authUser._id);
			}

			return post;
		});

		setPost({ ...post });
	};

	const commentRemove = _id => {
        post.comments = post.comments.filter(post => {
            return post._id !== _id;
        })

		setPost({ ...post });
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const api = import.meta.env.VITE_API_URL;
			const res = await fetch(`${api}/posts/${id}`);
			const data = await res.json();

			setPost(data);
			setIsLoading(false);
			setHasUpdate(false);
		})();
	}, [hasUpdate]);

	return (
		<Box>
			{isLoading ? (
				<Box>Loading...</Box>
			) : (
				<>
					<PostCard
						post={post}
						like={like}
						unlike={unlike}
						focus={true}
                        remove={remove}
					/>

					<Box sx={{ mt: 3 }}>
						{post.comments.map(comment => {
							return (
								<PostCard
									key={comment._id}
									post={comment}
									like={commentLike}
									unlike={commentUnlike}
                                    remove={commentRemove}
								/>
							);
						})}
					</Box>

					<Box
						sx={{
							p: 2,
							pb: 3,
							mt: 4,
							bottom: 0,
							position: "sticky",
							bgcolor: "banner.background",
						}}>
						<FormControl fullWidth>
							<form
								onSubmit={e => {
									e.preventDefault();

									(async () => {
										const body = input.current.value;
										if (!body) return false;

										const api = import.meta.env
											.VITE_API_URL;
										const token =
											localStorage.getItem("token");

										const res = await fetch(
											`${api}/posts/${post._id}/comment`,
											{
												method: "POST",
												body: JSON.stringify({ body }),
												headers: {
													"Content-Type":
														"application/json",
													Authorization: `Bearer ${token}`,
												},
											}
										);

										if (!res.ok) {
											return false;
										}

										setHasUpdate(true);
									})();
								}}>
								<Input
									inputRef={input}
									sx={{ fontSize: "16px", py: 2 }}
									placeholder="Your comment"
									multiline
									fullWidth
									variant="standard"
									endAdornment={
										<InputAdornment position="end">
											<IconButton type="submit">
												<AddIcon color="info" />
											</IconButton>
										</InputAdornment>
									}
								/>
							</form>
						</FormControl>
					</Box>
				</>
			)}
		</Box>
	);
}
