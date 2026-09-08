import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { getTenantByIdOrSlug } from '../types/tenant';
import { ROUTE_PATHS } from '../router/routePaths';
import { useAuth } from '../context/AuthContext';

export const SchoolApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const school = id ? getTenantByIdOrSlug(id) : undefined;
  const schoolName = school?.name || 'School';

  // Protect route: redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(ROUTE_PATHS.LOGIN, {
        replace: true,
        state: {
          from: location.pathname,
          message: `Please log in to submit your teaching application for ${schoolName}.`,
        },
      });
    }
  }, [isAuthenticated, isLoading, navigate, location.pathname, schoolName]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to={school ? `/schools/${school.id}` : ROUTE_PATHS.HOME}
          startIcon={<ArrowBackIcon />}
          sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          {school ? `Back to ${school.name}` : 'Back to Home'}
        </Button>
      </Box>

      <Card
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 4,
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
          textAlign: 'center',
        }}
      >
        <CardContent sx={{ py: 6 }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.35)',
              mb: 3,
            }}
          >
            <AssignmentTurnedInIcon sx={{ color: '#FFFFFF', fontSize: 40 }} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Chip
              label="Teacher Application Portal"
              color="success"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600, py: 0.5 }}
            />
          </Box>

          {/* User requirement text */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 2.5,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to the application page for {schoolName}...
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              maxWidth: 550,
              mx: 'auto',
              borderRadius: 3,
              bgcolor: 'rgba(11, 15, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              mb: 4,
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              The comprehensive application form and document submission system will be available in the upcoming release.
              Thank you for your interest in joining the teaching faculty at{' '}
              <Box component="span" sx={{ color: 'primary.light', fontWeight: 600 }}>
                {schoolName}
              </Box>
              .
            </Typography>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {school && (
              <Button
                component={Link}
                to={`/schools/${school.id}`}
                variant="outlined"
                color="primary"
                startIcon={<SchoolIcon />}
              >
                View School Profile
              </Button>
            )}
            <Button
              component={Link}
              to={ROUTE_PATHS.HOME}
              variant="contained"
              color="primary"
            >
              Back to School Directory
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
