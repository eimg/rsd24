import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
} from "@mui/material";

import {
    CheckCircleOutline as CheckIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from "@mui/icons-material";

export default function CheckList({ list, remove }) {
    return (
		<List>
			{list.map(item => {
				return (
					<ListItem
						key={item._id}
						secondaryAction={
							<>
								<IconButton>
									<EditIcon color="info" />
								</IconButton>
								<IconButton onClick={() => {
                                    remove(item._id);
                                }}>
									<DeleteIcon color="error" />
								</IconButton>
							</>
						}>
                        <ListItemIcon>
                            <IconButton>
                                <CheckIcon />
                            </IconButton>
                        </ListItemIcon>
						<ListItemText primary={item.subject} />
					</ListItem>
				);
			})}
		</List>
	);
}