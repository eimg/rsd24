import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { deepPurple } from "@mui/material/colors";

import { useState, useMemo, createContext, useContext } from "react";

const AppThemeContext = createContext();

export function useAppTheme() {
    return useContext(AppThemeContext);
}

export default function AppThemeProvider({ children }) {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => {
        return createTheme({
			palette: {
				mode,
				...(mode === "light"
					? {
							header: { background: deepPurple[400] },
					  }
					: {
							header: { background: deepPurple[900] },
					  }),
			},
		});
    }, [mode]);

    return (
		<AppThemeContext.Provider value={{ mode, setMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppThemeContext.Provider>
	);
}
