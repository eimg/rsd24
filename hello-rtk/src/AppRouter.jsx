import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Edit from "./Edit.jsx";
import Template from "./Template.jsx";

export default function AppRouter() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Template />,
			children: [
				{
					path: "/",
					element: <App />,
				},
				{
					path: "/edit",
					element: <Edit />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
