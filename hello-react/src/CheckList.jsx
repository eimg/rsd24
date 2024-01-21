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

export default function CheckList({ list, remove, toggle, done }) {
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
										remove(item._id);
									}}>
									<DeleteIcon color="error" />
								</IconButton>
							</>
						}>
						<ListItemIcon>
							<IconButton
                                
								onClick={() => {
									toggle(item._id);
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
