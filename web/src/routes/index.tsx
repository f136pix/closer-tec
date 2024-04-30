import {Navigate, Route, Routes} from "react-router-dom";

import DashboardPage from "../components/DashboardPage/components/DashboardPage/DashboardPage.tsx";
import LoginPage from "../components/LoginPage/LoginPage.tsx";
import {AuthProvider, useAuth} from "../hooks/useAuth.tsx";

type IProtectedRoutesProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({children}: IProtectedRoutesProps) => {
    const auth = useAuth();
    console.log(auth);
    if (!auth || !auth.jwt) {
        console.log(auth)
        return <Navigate to="/auth"/>;
    }
    return children;
};

type IPublicRoutesProps = {
    children: React.ReactNode;
};

const PublicRoute = ({children}: IPublicRoutesProps) => {
    const auth = useAuth();
    if (auth.jwt) {
        console.log(auth);
        return <Navigate to="/"/>;
    }
    return children;
};

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/auth" element=
                    {
                        <PublicRoute>
                            <LoginPage/>
                        </PublicRoute>
                    }>
                </Route>
                <Route path="/" element=
                    {
                        <ProtectedRoute>
                            <DashboardPage/>
                        </ProtectedRoute>
                    }>
                </Route>
            </Routes>
        </AuthProvider>
    )
        ;
};

export default AppRoutes;
