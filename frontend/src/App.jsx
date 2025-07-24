import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { RequireAuth, RequireAdmin, RequireUser, RequireGuest } from "./components/auth/ProtectedRoute";

// Import components using new organized structure
import { 
  HomePage, 
  DownloadPage, 
  TransfersPage, 
  VehiclesPage, 
  OwnersPage, 
  StatisticsPage,
  NotificationsPage,
  SettingsPage,
  UserProfile
} from "./components/pages";

import { 
  Login, 
  AdminLogin, 
  Register 
} from "./components/auth";

import { 
  Dashboard,
  AdminDashboard 
} from "./components/dashboard";

import { 
  VehicleTransferForm 
} from "./components/forms";

import { 
  Navbar 
} from "./components/shared";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/downloads" element={<DownloadPage />} />
            
            {/* Guest only routes (redirect if authenticated) */}
            <Route path="/login" element={
              <RequireGuest>
                <Login />
              </RequireGuest>
            } />
            <Route path="/admin" element={
              <RequireGuest>
                <AdminLogin />
              </RequireGuest>
            } />
            <Route path="/signup" element={
              <RequireGuest>
                <Register />
              </RequireGuest>
            } />

            {/* Protected user routes */}
            <Route path="/dashboard" element={
              <RequireUser>
                <Dashboard />
              </RequireUser>
            } />
            <Route path="/profile" element={
              <RequireUser>
                <UserProfile />
              </RequireUser>
            } />
            <Route path="/transfer" element={
              <RequireUser>
                <VehicleTransferForm />
              </RequireUser>
            } />
            <Route path="/vehicle-transfer" element={
              <RequireUser>
                <VehicleTransferForm />
              </RequireUser>
            } />

            {/* Protected admin routes */}
            <Route path="/admin/dashboard" element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            } />
            <Route path="/admin/transfers" element={
              <RequireAdmin>
                <TransfersPage />
              </RequireAdmin>
            } />
            <Route path="/admin/vehicles" element={
              <RequireAdmin>
                <VehiclesPage />
              </RequireAdmin>
            } />
            <Route path="/admin/owners" element={
              <RequireAdmin>
                <OwnersPage />
              </RequireAdmin>
            } />
            <Route path="/admin/statistics" element={
              <RequireAdmin>
                <StatisticsPage />
              </RequireAdmin>
            } />
            <Route path="/admin/notifications" element={
              <RequireAdmin>
                <NotificationsPage />
              </RequireAdmin>
            } />
            <Route path="/admin/settings" element={
              <RequireAdmin>
                <SettingsPage />
              </RequireAdmin>
            } />

            {/* Protected routes for both user types */}
            <Route path="/settings" element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            } />
            <Route path="/notifications" element={
              <RequireAuth>
                <NotificationsPage />
              </RequireAuth>
            } />

            {/* 404 fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Page not found</p>
                  <a 
                    href="/" 
                    className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
