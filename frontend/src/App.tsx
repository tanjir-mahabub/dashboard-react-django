import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './provider/ThemeProvider';
import { AuthProvider } from './provider/AuthProvider';
import GlobalLoader from './components/GlobalLoader';
import { LoaderProvider } from './provider/LoaderProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoaderProvider>
          <GlobalLoader />
          <Router>
            <Layout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </LoaderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
