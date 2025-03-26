import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null); //    token 상태 추가

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setIsLoggedIn(!!storedToken); //    token이 있으면 로그인 상태 true
        setToken(storedToken); //    token 상태 업데이트
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
