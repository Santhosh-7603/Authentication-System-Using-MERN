import { Route, Routes } from "react-router-dom";
import Home from "../Components/pages/Home";
import ViewProfile from "../Components/pages/ViewProfile";

function MainRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="view-profile" element={<ViewProfile />} />
    </Routes>
  );
}

export default MainRoutes;
