import React from 'react';
import { Container, Box, Typography, Grid, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LaunchIcon from '@mui/icons-material/Launch';
import { ROUTE_PATHS } from '../../router/routePaths';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0B0F19',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        py: { xs: 6, md: 8 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SchoolIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Teacher
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360, mb: 2, lineHeight: 1.6 }}>
              The unified client portal for modern educators and students. Seamlessly access courses, schedules, assignments, and campus communication in a secure environment.
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
              Academic Hub
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

          <Grid item xs={6} md={4}>
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
  );
};
