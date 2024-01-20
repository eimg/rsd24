import { useState } from "react";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Edit from "./Edit.jsx";
import Template from "./Template.jsx";

export default function AppRouter() {
	const [list, setList] = useState([
		{ _id: 1, subject: "Apple", done: false },
		{ _id: 2, subject: "Orange", done: true },
		{ _id: 3, subject: "Mango", done: false },
	]);

	const update = (_id, subject) => {
		if (!subject) return false;

		setList(
			list.map(item => {
				if (item._id === _id) item.subject = subject;
				return item;
			})
		);
	};

	const add = subject => {
		if (!subject) return false;

		const _id = list[list.length - 1]._id + 1;
		setList([...list, { _id, subject, done: false }]);
	};

	const remove = _id => {
		setList(list.filter(item => item._id !== _id));
	};

	const toggle = _id => {
		setList(
			list.map(item => {
				if (item._id === _id) item.done = !item.done;
				return item;
			})
		);
	};

	const clear = () => {
		setList(list.filter(item => !item.done));
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<Template
					list={list}
					clear={clear}
				/>
			),
			children: [
				{
					path: "/",
					element: (
						<App
							list={list}
							add={add}
							toggle={toggle}
							remove={remove}
						/>
					),
				},
				{
					path: "/edit",
					element: <Edit update={update} />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
