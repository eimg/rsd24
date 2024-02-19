import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { purple } from "@mui/material/colors";

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
							header: { background: purple[400] },
                            banner: { background: "#e1e1e1" }
					  }
					: {
							header: { background: purple[900] },
                            banner: { background: "#222" }
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
