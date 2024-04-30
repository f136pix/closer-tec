import {Route, Routes} from "react-router-dom";

import LoginPage from "../components/LoginPage/LoginPage.tsx";
import DashboardPage from "../components/DashboardPage/components/DashboardPage/DashboardPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth" element={<LoginPage/>}></Route>
            <Route path="/" element={<DashboardPage/>}></Route>
</Routes>

)
    ;
};

export default AppRoutes;
