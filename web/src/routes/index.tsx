import {Route, Routes} from "react-router-dom";

import DashboardPage from "../components/DashboardPage/DashboardPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/app" element={<DashboardPage/>}/>
        </Routes>

    );
};

export default AppRoutes;