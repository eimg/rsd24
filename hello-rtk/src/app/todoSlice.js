import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		items: [
			{ _id: 1, subject: "R Apple", done: false },
			{ _id: 2, subject: "R Orange", done: true },
			{ _id: 3, subject: "R Mango", done: false },
		],
	},
	reducers: {
		add: (state, action) => {
            const _id = state.items[state.items.length - 1]._id + 1;
			state.items.push(
				{ _id, subject: action.payload, done: false }
			);
		},
        remove: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        }
	},
});

export const { add, remove } = todoSlice.actions;
export default todoSlice.reducer;
