import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Divider,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ApiIcon from '@mui/icons-material/Api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { ROUTE_PATHS } from '../router/routePaths';

interface SystemSection {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  isExternal?: boolean;
  badge: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

export const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const systemSections: SystemSection[] = [
    {
      title: 'Courses & Curriculum',
      category: 'Learning Management',
      description: 'Explore comprehensive curriculum modules, lecture materials, syllabi, and interactive exercises.',
      icon: <AutoStoriesIcon sx={{ fontSize: 32 }} />,
      route: ROUTE_PATHS.COURSES,
      badge: 'Client Interface',
      color: 'primary',
    },
    {
      title: 'Class Schedule & Timetable',
      category: 'Academic Calendar',
      description: 'Review live class schedules, upcoming exam timetables, mentoring sessions, and calendar integration.',
      icon: <CalendarMonthIcon sx={{ fontSize: 32 }} />,
      route: ROUTE_PATHS.SCHEDULE,
      badge: 'Live Sync',
      color: 'secondary',
    },
    {
      title: 'Assignments & Assessments',
      category: 'Student Submissions',
      description: 'Submit coursework, monitor grading progress, complete quizzes, and receive detailed instructor feedback.',
      icon: <AssignmentIcon sx={{ fontSize: 32 }} />,
      route: ROUTE_PATHS.ASSIGNMENTS,
      badge: 'Interactive',
      color: 'info',
    },
    {
      title: 'Faculty & Mentors Directory',
      category: 'Instructors',
      description: 'Browse certified teachers, check subject specializations, and schedule one-on-one advisory hours.',
      icon: <PeopleAltIcon sx={{ fontSize: 32 }} />,
      route: ROUTE_PATHS.TEACHERS,
      badge: 'Verified Staff',
      color: 'success',
    },
    {
      title: 'Back-Office Administration',
      category: 'System Management',
      description: 'Access the central management portal for tenant configuration, user roles, permissions, and institution metrics.',
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />,
      route: ROUTE_PATHS.BACKOFFICE_ADMIN,
      isExternal: true,
      badge: 'Admin System',
      color: 'warning',
    },
    {
      title: 'Backend API & System Gateway',
      category: 'Platform Core',
      description: 'Connect to Spring Boot REST endpoints, OpenAPI documentation, and multi-tenant authentication services.',
      icon: <ApiIcon sx={{ fontSize: 32 }} />,
      route: ROUTE_PATHS.SYSTEM_API_DOCS,
      badge: 'REST Services',
      color: 'primary',
    },
  ];

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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Navigation Header */}
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                }}
              >
                <SchoolIcon sx={{ color: '#FFFFFF', fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Teacher
                </Typography>
                <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 600, letterSpacing: '0.05em' }}>
                  CLIENT PORTAL
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
              <Button href="#overview" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                Overview
              </Button>
              <Button href="#sections" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                System Sections
              </Button>
              <Button href="#ecosystem" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                Ecosystem
              </Button>
              <Button
                variant="outlined"
                color="primary"
                href={ROUTE_PATHS.BACKOFFICE_ADMIN}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
              >
                Back-Office Portal
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton onClick={() => setMobileMenuOpen(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: { width: 280, bgcolor: 'background.paper', p: 2 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Teacher Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton href="#overview" onClick={() => setMobileMenuOpen(false)}>
              <ListItemText primary="Overview" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="#sections" onClick={() => setMobileMenuOpen(false)}>
              <ListItemText primary="System Sections" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="#ecosystem" onClick={() => setMobileMenuOpen(false)}>
              <ListItemText primary="Ecosystem" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mt: 2 }}>
            <ListItemButton
              component="a"
              href={ROUTE_PATHS.BACKOFFICE_ADMIN}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', borderRadius: 1.5 }}
            >
              <ListItemIcon sx={{ color: 'primary.light', minWidth: 36 }}>
                <LaunchIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Back-Office Portal" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

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
                label="Teacher Client Interface • Connected to System Backend"
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
              Connecting Clients with{' '}
              <Box component="span" sx={{ color: 'primary.light' }}>
                Academic Excellence
              </Box>
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 4, fontSize: '1.2rem', color: 'text.secondary', px: { xs: 2, md: 6 } }}>
              The official client-side interface of the Teacher system. Empowering students and teachers
              with real-time course access, assignments, faculty mentorship, and streamlined administrative synchronization.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="#sections"
                endIcon={<ArrowForwardIcon />}
              >
                Explore System Sections
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

          {/* Quick Metrics */}
          <Grid container spacing={3} sx={{ mt: 6 }}>
            {[
              { label: 'Client Application', value: 'React + TypeScript' },
              { label: 'UI Framework', value: 'Material UI (MUI)' },
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

      {/* System Sections */}
      <Box id="sections" sx={{ py: { xs: 8, md: 10 }, flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: 'primary.light', fontWeight: 700, letterSpacing: '0.1em' }}>
              SYSTEM ARCHITECTURE & SECTIONS
            </Typography>
            <Typography variant="h2" sx={{ mt: 0.5 }}>
              Available System Modules
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 650, mx: 'auto', mt: 1 }}>
              Navigate between client-facing modules, core academic functions, and system administration services.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {systemSections.map((section, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.25,
                          borderRadius: 2.5,
                          bgcolor: 'rgba(99, 102, 241, 0.12)',
                          color: `${section.color}.light`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {section.icon}
                      </Box>
                      <Chip
                        label={section.badge}
                        size="small"
                        color={section.color}
                        variant="outlined"
                        sx={{ fontSize: '0.75rem', height: 24 }}
                      />
                    </Box>

                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontWeight: 600 }}>
                      {section.category}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, mb: 1.5 }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {section.description}
                    </Typography>
                  </CardContent>

                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />

                  <CardActions sx={{ p: 2, px: 3 }}>
                    {section.isExternal ? (
                      <Button
                        fullWidth
                        variant="outlined"
                        color="warning"
                        href={section.route}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                      >
                        Launch Back-Office
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color={section.color}
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        onClick={() => {
                          alert(`Navigating to ${section.title} (${section.route})`);
                        }}
                      >
                        Open Module
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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
                View System Overview
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

      {/* Footer */}
      <Box sx={{ py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <SchoolIcon sx={{ color: 'primary.light', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Teacher
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 320 }}>
                Client-side interface application for educational and institutional management.
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 2 }}>
                Stack: React 19 • TypeScript • Vite • MUI (Material-UI)
              </Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                System Sections
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  component="a"
                  href="#sections"
                  variant="body2"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                >
                  Courses & Curriculum
                </Typography>
                <Typography
                  component="a"
                  href="#sections"
                  variant="body2"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                >
                  Class Schedules
                </Typography>
                <Typography
                  component="a"
                  href="#sections"
                  variant="body2"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                >
                  Assignments
                </Typography>
                <Typography
                  component="a"
                  href="#sections"
                  variant="body2"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                >
                  Faculty Directory
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Connected Portals
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  component="a"
                  href={ROUTE_PATHS.BACKOFFICE_ADMIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ color: 'primary.light', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  Back-Office Admin <LaunchIcon sx={{ fontSize: 13 }} />
                </Typography>
                <Typography
                  component="a"
                  href="#overview"
                  variant="body2"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                >
                  System Status
                </Typography>
                <Typography
                  component="a"
                  href="#overview"
                  variant="body2"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                >
                  API Gateway
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.06)' }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              &copy; {new Date().getFullYear()} Teacher System. All rights reserved.
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Client Web Application (Sources/FE/teacher)
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
