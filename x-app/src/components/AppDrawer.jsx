import {
    Drawer,
    Box,
} from "@mui/material";

import { useUIState } from "../providers/UIStateProvider";

export default function AppDrawer() {
    const { openDrawer, setOpenDrawer } = useUIState();

    return <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 300 }}>
        </Box>
    </Drawer>
}
