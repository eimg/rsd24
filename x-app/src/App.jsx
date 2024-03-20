import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import Notis from "./pages/Notis";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import Search from "./pages/Search";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import EditProfile from "./pages/EditProfile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/posts/:id",
				element: <Post />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/likes/:id",
				element: <Likes />,
			},
			{
				path: "/profile/:id",
				element: <Profile />,
			},
			{
				path: "/notis",
				element: <Notis />,
			},
			{
				path: "/new",
				element: <AddPost />,
			},
			{
				path: "/search",
				element: <Search />,
			},
			{
				path: "/followers/:id",
				element: <Followers />,
			},
			{
				path: "/following/:id",
				element: <Following />,
			},
			{
				path: "/edit",
				element: <EditProfile />,
			},
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
