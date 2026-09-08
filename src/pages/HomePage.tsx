import React, { useMemo } from 'react';
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Chip,
  Paper,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { ROUTE_PATHS } from '../router/routePaths';
import { getTenants } from '../types/tenant';
import { PartnerSchoolsSection } from '../components/schools/PartnerSchoolsSection';

export const HomePage: React.FC = () => {
  const allSchools = useMemo(() => getTenants(), []);

  const highlights = [
    {
      icon: <SecurityIcon sx={{ color: '#6366F1' }} />,
      title: 'Multi-Tenant Architecture',
      description: 'Isolated data spaces and fine-grained access control tailored for educational institutions.',
    },
    {
      icon: <SpeedIcon sx={{ color: '#10B981' }} />,
      title: 'High-Performance Interface',
      description: 'Engineered with React, TypeScript, and Vite for instant page loads and fluid navigation.',
    },
    {
      icon: <SmartphoneIcon sx={{ color: '#06B6D4' }} />,
      title: 'Cross-Platform Ecosystem',
      description: 'Seamless synergy across Web Client, Mobile App (React Native/Expo), and Back-Office UI.',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

      {/* Hero Section */}
      <Box
        id="overview"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.18), transparent)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 840, mx: 'auto' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 3 }}>
              <Chip
                icon={<CheckCircleOutlineIcon sx={{ fontSize: '18px !important' }} />}
                label="Teacher Client Interface • Educational Network Directory"
                color="primary"
                variant="outlined"
                sx={{
                  bgcolor: 'rgba(99, 102, 241, 0.08)',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  fontWeight: 600,
                  py: 0.5,
                }}
              />
            </Box>

            <Typography variant="h1" sx={{ mb: 2.5, fontWeight: 800 }}>
              Connecting Educators with{' '}
              <Box component="span" sx={{ color: 'primary.light' }}>
                Premier Institutions
              </Box>
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 4, fontSize: '1.2rem', color: 'text.secondary', px: { xs: 2, md: 6 } }}>
              The central gateway for teachers and academic staff. Explore partner schools, view institutional statistics,
              and apply directly for open teaching positions across our nationwide network.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="#sections"
                endIcon={<ArrowForwardIcon />}
              >
                Explore Partner Schools
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href={ROUTE_PATHS.BACKOFFICE_ADMIN}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<LaunchIcon sx={{ fontSize: 18 }} />}
              >
                Back-Office Portal
              </Button>
            </Box>
          </Box>

          {/* Quick Platform Metrics */}
          <Grid container spacing={3} sx={{ mt: 6 }}>
            {[
              { label: 'Partner Schools', value: `${allSchools.length} Institutions` },
              {
                label: 'Actively Recruiting',
                value: `${allSchools.filter((s) => s.is_recruiting).length} Open Positions`,
              },
              { label: 'System Integration', value: 'Spring Boot REST' },
              { label: 'Platform Availability', value: '99.9% Uptime' },
            ].map((stat, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    textAlign: 'center',
                    borderRadius: 3,
                    bgcolor: 'rgba(17, 24, 39, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, color: 'text.primary' }}>
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* System Sections: Partner Schools Directory (Dedicated Component) */}
      <PartnerSchoolsSection schools={allSchools} />

      {/* Ecosystem & Capabilities */}
      <Box
        id="ecosystem"
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: 'background.paper',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="overline" sx={{ color: 'secondary.light', fontWeight: 700, letterSpacing: '0.1em' }}>
                INTEGRATED ECOSYSTEM
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
                Built for Scalability, Security & Speed
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                The Teacher project ecosystem unifies client web experiences, mobile applications,
                and high-level administrative governance under one coherent architecture.
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                href="#sections"
              >
                View Partner Schools
              </Button>
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                {highlights.map((item, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Paper
                      sx={{
                        p: 2.5,
                        display: 'flex',
                        gap: 2,
                        alignItems: 'flex-start',
                        bgcolor: 'rgba(11, 15, 25, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: 3,
                      }}
                    >
                      <Box sx={{ mt: 0.5 }}>{item.icon}</Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};
