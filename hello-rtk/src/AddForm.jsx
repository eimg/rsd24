import { useRef } from "react";

import { Input, IconButton, } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { add } from "./app/todoSlice";

export default function AddForm() {
	const inputRef = useRef();
    const dispatch = useDispatch();

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				const subject = inputRef.current.value;
				dispatch( add(subject) );

				inputRef.current.value = "";
				inputRef.current.focus();
			}}>
            <Input 
                inputRef={inputRef}
                fullWidth
                endAdornment={
                    <IconButton type="submit">
                        <AddIcon />
                    </IconButton>
                }
            />
		</form>
	);
}
