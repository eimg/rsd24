import { useRef } from "react";

import { Input, IconButton, } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export default function AddForm({ add }) {
	const inputRef = useRef();
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				const subject = inputRef.current.value;
				add(subject);

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
