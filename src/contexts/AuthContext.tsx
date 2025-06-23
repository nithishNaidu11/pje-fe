import React from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: VoidFunction;
    logout: VoidFunction;
}

const AuthContext = React.createContext({
    isAuthenticated: false,
    login: () => {
        return;
    },
    logout: () => {
        return;
    }
} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
