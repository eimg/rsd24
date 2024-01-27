import {
    createTheme,
    ThemeProvider,
    CssBaseline
} from "@mui/material";

import { useMemo, createContext, useState } from "react";
import AppRouter from "./AppRouter";

export const ThemeContext = createContext();

export default function Theme() {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => {
        return createTheme({
			palette: {
				mode,
			},
		});
    }, [ mode ]);
    
    return (
		<ThemeContext.Provider value={{ mode, setMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppRouter />
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}
