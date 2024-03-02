import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import PostCard from "../components/PostCard";

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const api = import.meta.env.VITE_API_URL;
			const res = await fetch(`${api}/posts`);
			const data = await res.json();

			setPosts(data);
			setIsLoading(false);
		})();
	}, []);

	return (
		<Box>
			{isLoading ? (
				<Box>Loading...</Box>
			) : (
				posts.map(post => <PostCard key={post._id} post={post} />)
			)}
		</Box>
	);
}
