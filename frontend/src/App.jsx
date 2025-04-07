import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import TransfersPage from "./components/TransfersPage";
import VehiclesPage from "./components/VehiclesPage";
import OwnersPage from "./components/OwnersPage";
import StatisticsPage from "./components/StatisticsPage";
import Dashboard from "./components/Dashboard";
import VehicleTransferForm from "./components/VehicleTransferForm";
import NotificationsPage from "./components/NotificationsPage";
import SettingsPage from "./components/SettingsPage";
import DownloadPage from "./components/DownloadPage";
// import SignUp from "./components/SignUp";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/transfers" element={<TransfersPage />} />
        <Route path="/admin/vehicles" element={<VehiclesPage />} />
        <Route path="/admin/owners" element={<OwnersPage />} />
        <Route path="/admin/statistics" element={<StatisticsPage />} />
        <Route path="/admin/notifications" element={<NotificationsPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<VehicleTransferForm />} />
        <Route path="/vehicle-transfer" element={<VehicleTransferForm />} />
        <Route path="/downloads" element={<DownloadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
