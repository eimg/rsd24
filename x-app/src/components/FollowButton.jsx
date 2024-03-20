import { useEffect, useState } from "react";

import { Button } from "@mui/material";

import { useAuth } from "../providers/AuthProvider";

export default function FollowButton({ user }) {
	const { authUser, setAuthUser } = useAuth();

    console.log(user);

	const [followed, setFollowed] = useState(
		authUser.following && authUser.following.includes(user._id)
	);

    useEffect(() => {
        setFollowed(
			authUser.following && authUser.following.includes(user._id)
		);
    }, [user]);

	return (
		<Button
			size="small"
			edge="end"
			variant={followed ? "outlined" : "contained"}
			sx={{ borderRadius: 5 }}
			onClick={() => {
                const api = import.meta.env.VITE_API_URL;
				const token = localStorage.getItem("token");

				if (followed) {
					authUser.following = authUser.following.filter(
						userId => userId !== user._id
					);

					setAuthUser({ ...authUser });

                    fetch(`${api}/users/${user._id}/unfollow`, { 
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
				} else {
					authUser.following.push(user._id);
					setAuthUser({ ...authUser });
                    
                    fetch(`${api}/users/${user._id}/follow`, {
						method: "PUT",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
				}

				setFollowed(!followed);
			}}>
			{followed ? "Followed" : "Follow"}
		</Button>
	);
}
