import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SchoolIcon from '@mui/icons-material/School';
import { useAuth } from '../context/AuthContext';
import { ROUTE_PATHS } from '../router/routePaths';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const locationState = location.state as { message?: string; from?: string } | null;
  const redirectPath = locationState?.from || new URLSearchParams(location.search).get('redirect') || ROUTE_PATHS.HOME;

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Message passed from redirect (e.g. registration success or apply requirement)
  const infoMessage = locationState?.from ? locationState.message : null;
  const successMessage = !locationState?.from ? locationState?.message : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      // Redirect to return path or home
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      const serverMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Authentication failed. Please check your credentials and try again.';
      setError(serverMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 8, md: 12 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      {/* Brand Icon Header */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.45)',
            mb: 2,
          }}
        >
          <SchoolIcon sx={{ color: '#FFFFFF', fontSize: 32 }} />
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, textAlign: 'center', mb: 0.5 }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Sign in to access your courses, schedules, and learning materials
        </Typography>
      </Box>

      {/* Login Card */}
      <Card
        sx={{
          width: '100%',
          p: { xs: 1, sm: 2 },
          bgcolor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          {infoMessage && (
            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
              {infoMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              {successMessage}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={submitting}
                sx={{
                  py: 1.4,
                  fontSize: '1rem',
                  fontWeight: 700,
                  mt: 1,
                }}
              >
                {submitting ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 3.5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Don&apos;t have an account?{' '}
              <Typography
                component={Link}
                to={ROUTE_PATHS.SIGN_UP}
                variant="body2"
                sx={{
                  color: 'primary.light',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
