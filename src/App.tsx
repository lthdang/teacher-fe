import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { SchoolDetailPage } from './pages/SchoolDetailPage';
import { SchoolApplicationPage } from './pages/SchoolApplicationPage';
import { ROUTE_PATHS } from './router/routePaths';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
              <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
              <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUpPage />} />
              <Route path={ROUTE_PATHS.REGISTER} element={<Navigate to={ROUTE_PATHS.SIGN_UP} replace />} />
              <Route path={ROUTE_PATHS.SCHOOL_DETAIL} element={<SchoolDetailPage />} />
              <Route path={ROUTE_PATHS.SCHOOL_APPLY} element={<SchoolApplicationPage />} />
              <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
