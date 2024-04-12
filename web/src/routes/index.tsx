import {Route, Routes} from "react-router-dom";

import DashboardPage from "../components/DashboardPage/components/DashboardPage/DashboardPage.tsx";
import LoginPage from "../components/DashboardPage/components/LoginPage/LoginPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/app" element={<DashboardPage/>}/>
        </Routes>

    );
};

export default AppRoutes;