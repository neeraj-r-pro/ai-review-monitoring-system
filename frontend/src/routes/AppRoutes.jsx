import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Reviews from "../pages/Reviews";
import NotFound from "../pages/NotFound";
import Insights from "../pages/Insights";
import Reports from "../pages/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;