import {
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	IconButton,
} from "@mui/material";

import {
	CheckCircleOutline as CheckIcon,
	CheckCircle as DoneIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { remove, toggle } from "./app/todoSlice";

export default function CheckList({ list, done }) {
    const dispatch = useDispatch();

	return (
		<List sx={{ opacity: done ? 0.5 : 1 }}>
			{list.map(item => {
				return (
					<ListItem
						key={item._id}
						secondaryAction={
							<>
								<IconButton>
									<Link to="/edit" state={{ item }}>
										<EditIcon color="info" />
									</Link>
								</IconButton>
								<IconButton
									onClick={() => {
										dispatch( remove(item._id) );
									}}>
									<DeleteIcon color="error" />
								</IconButton>
							</>
						}>
						<ListItemIcon>
							<IconButton
								onClick={() => {
									dispatch( toggle(item._id) );
								}}>
								{done ? (
									<DoneIcon color="success" />
								) : (
									<CheckIcon />
								)}
							</IconButton>
						</ListItemIcon>
						<ListItemText primary={item.subject} />
					</ListItem>
				);
			})}
		</List>
	);
}
