import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
} 

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const [authUser, setAuthUser] = useState({ name: 'Alice' });

    return <AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}
