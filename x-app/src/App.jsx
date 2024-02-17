import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";

import { Box } from "@mui/material";

import { useUIState } from "./providers/UIStateProvider";

export default function App() {
    const { openDrawer, setOpenDrawer } = useUIState();

    return <Box>
        <AppDrawer />
        <Header />
    </Box>
}
