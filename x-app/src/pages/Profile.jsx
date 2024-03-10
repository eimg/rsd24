import { Avatar, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

import { useAuth } from "../providers/AuthProvider";

import PostCard from "../components/PostCard";
import { blue, pink } from "@mui/material/colors";

import { useParams } from "react-router-dom";

export default function Profile() {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [photo, setPhoto] = useState("");
	const [cover, setCover] = useState("");
	const [user, setUser] = useState({});

	const { authUser } = useAuth();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const api = import.meta.env.VITE_API_URL;

			const posts_res = await fetch(`${api}/posts/profile/${id}`);
			setPosts(await posts_res.json());

			const user_res = await fetch(`${api}/users/${id}`);
            const user_data = await user_res.json();

			setUser(user_data);

            const profilePhoto = `${import.meta.env.VITE_PROFILE_PHOTOS}/${
                user_data.profile
            }`;
            setPhoto(profilePhoto);

            const coverPhoto = `${import.meta.env.VITE_COVER_PHOTOS}/${
				user_data.cover
			}`;
            setCover(coverPhoto);

			setIsLoading(false);
		})();
	}, []);

	const like = _id => {
		const result = posts.map(post => {
			if (post._id === _id) {
				post.likes.push(authUser._id);
			}

			return post;
		});

		setPosts(result);
	};

	const unlike = _id => {
		const result = posts.map(post => {
			if (post._id === _id) {
				post.likes = post.likes.filter(like => like !== authUser._id);
			}

			return post;
		});

		setPosts(result);
	};

	const getFile = async () => {
		const [fileHandle] = await window.showOpenFilePicker({
			types: [
				{
					description: "Images",
					accept: {
						"image/*": [".png", ".jpeg", ".jpg"],
					},
				},
			],
			excludeAcceptAllOption: true,
			multiple: false,
		});
		return await fileHandle.getFile();
	};

	const changePhoto = async e => {
		const file = await getFile();
		setPhoto(URL.createObjectURL(file));

		const fileName =
			file.type === "image/png"
				? `${authUser._id}-profile.png`
				: `${authUser._id}-profile.jpg`;

		const formData = new FormData();
		formData.append("profile", file, fileName);

		const api = import.meta.env.VITE_API_URL;
		const token = localStorage.getItem("token");
		const res = await fetch(`${api}/users/profile`, {
			method: "post",
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.ok;
	};

    const changeCover = async e => {
		const file = await getFile();
		setCover(URL.createObjectURL(file));

		const fileName =
			file.type === "image/png"
				? `${authUser._id}-cover.png`
				: `${authUser._id}-cover.jpg`;

		const formData = new FormData();
		formData.append("cover", file, fileName);

		const api = import.meta.env.VITE_API_URL;
		const token = localStorage.getItem("token");
		const res = await fetch(`${api}/users/cover`, {
			method: "post",
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.ok;
	};

	return (
		<Box>
			<Box
				sx={{
					background: blue[500],
					height: 200,
					borderRadius: 5,
					cursor: "pointer",
					overflow: "hidden",
				}}
				onClick={async () => {
					if(user._id === authUser._id) changeCover();
				}}>
				<img
					src={cover}
					width="100%"
					alt=""
				/>
			</Box>
			<Box
				sx={{
					marginTop: "-64px",
					marginBottom: "40px",
					textAlign: "center",
				}}>
				<Button
					onClick={async () => {
						if (user._id === authUser._id) changePhoto();
					}}>
					<Avatar
						src={photo}
						sx={{
							width: 128,
							height: 128,
							background: pink[500],
						}}></Avatar>
				</Button>
			</Box>

			{isLoading ? (
				<Box>Loading...</Box>
			) : (
				posts.map(post => (
					<PostCard
						key={post._id}
						post={post}
						like={like}
						unlike={unlike}
					/>
				))
			)}
		</Box>
	);
}
