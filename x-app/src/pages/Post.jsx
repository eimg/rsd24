import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import { useAuth } from "../providers/AuthProvider";

import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";

export default function Home() {
    const { id } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState({});

	const { authUser } = useAuth();

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const api = import.meta.env.VITE_API_URL;
			const res = await fetch(`${api}/posts/${id}`);
			const data = await res.json();

			setPost(data);
			setIsLoading(false);
		})();
	}, []);

	return (
		<Box>
			{isLoading ? (
				<Box>Loading...</Box>
			) : (
				<>
					<PostCard
						post={post}
						like={() => {}}
						unlike={() => {}}
					/>
                    <hr />
                    {
                        post.comments.map(comment => {
                            return <PostCard
                                key={comment._id}
                                post={comment}
                                like={() => {}}
                                unlike={() => {}}
                            />
                        })
                    }
				</>
			)}
		</Box>
	);
}
