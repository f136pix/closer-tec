import React, {createContext, useContext, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import {deleteCookie, getCookie, saveCookie} from "../lib/utils.tsx";

type IChildren = {
    children: React.ReactNode;
};

type IAuthContext = {
    jwt: string | null;
    login: (receivedJwt: string) => Promise<void>;
    logout: () => Promise<void>;
    validate: () => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const AuthContext = createContext<IAuthContext>();

export const AuthProvider = ({children}: IChildren) => {
    const [jwt, setJwt] = useState<string | null>(getCookie("jwt"));
    const navigate = useNavigate();

    const login = async (receivedJwt: string) => {
        console.log(receivedJwt);
        await saveCookie("jwt", receivedJwt);
        setJwt(receivedJwt);
        navigate("/");
    };

    const logout = async () => {
        await deleteCookie("jwt");
        setJwt(null);
        navigate("/auth", {replace: true});
    };

    const validate = async () => {
        const jwt = getCookie("jwt");
        console.log(jwt);
    };

    const value = useMemo(
        () => ({
            jwt,
            login,
            logout,
            validate
        }),
        [jwt]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
