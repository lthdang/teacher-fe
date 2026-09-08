import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Avatar,
  Paper,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PublicIcon from '@mui/icons-material/Public';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import SendIcon from '@mui/icons-material/Send';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getTenantByIdOrSlug, formatSchoolLevel } from '../types/tenant';
import { ROUTE_PATHS } from '../router/routePaths';
import { useAuth } from '../context/AuthContext';

export const SchoolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [imgError, setImgError] = useState(false);

  const school = id ? getTenantByIdOrSlug(id) : undefined;

  const handleApplyClick = () => {
    if (!school) return;
    const targetUrl = `/schools/${school.id}/apply`;

    if (!isAuthenticated) {
      navigate(ROUTE_PATHS.LOGIN, {
        state: {
          from: targetUrl,
          message: `Please log in to submit your teaching application for ${school.name}.`,
        },
      });
    } else {
      navigate(targetUrl);
    }
  };

  if (!school) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Paper
          sx={{
            p: 6,
            borderRadius: 4,
            bgcolor: 'rgba(17, 24, 39, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <SchoolOutlinedIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
            School Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            We could not locate an educational institution with the requested identifier.
          </Typography>
          <Button
            component={Link}
            to={ROUTE_PATHS.HOME}
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  const initials = school.name
    .split(' ')
    .filter((w) => w.length > 0)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const fullAddress = `${school.address.street}, ${school.address.ward}, ${school.address.district}, ${school.address.province}`;

  return (
    <Box sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Navigation & Breadcrumb */}
        <Box sx={{ mb: 3 }}>
          <Button
            component={Link}
            to={`${ROUTE_PATHS.HOME}#sections`}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              '&:hover': { color: 'text.primary', bgcolor: 'rgba(255, 255, 255, 0.05)' },
            }}
          >
            Back to Institutions Directory
          </Button>
        </Box>

        {/* Hero Banner Header Card */}
        <Card
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            background: `radial-gradient(ellipse 70% 80% at 90% 10%, ${school.settings.theme_color}25, transparent), rgba(17, 24, 39, 0.9)`,
            border: `1px solid ${school.settings.theme_color}40`,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            {/* Left: Avatar + Title info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {school.settings.logo_url && !imgError ? (
                <Avatar
                  src={school.settings.logo_url}
                  alt={school.name}
                  onError={() => setImgError(true)}
                  sx={{
                    width: { xs: 72, md: 90 },
                    height: { xs: 72, md: 90 },
                    borderRadius: 3,
                    border: `2px solid ${school.settings.theme_color}80`,
                    boxShadow: `0 8px 24px ${school.settings.theme_color}30`,
                    bgcolor: school.settings.theme_color,
                    fontWeight: 700,
                    fontSize: '1.5rem',
                  }}
                >
                  {initials}
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    width: { xs: 72, md: 90 },
                    height: { xs: 72, md: 90 },
                    borderRadius: 3,
                    bgcolor: school.settings.theme_color || '#6366F1',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    fontWeight: 800,
                    fontSize: '1.5rem',
                  }}
                >
                  {initials}
                </Avatar>
              )}

              <Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  <Chip
                    label={formatSchoolLevel(school.school_level)}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(99, 102, 241, 0.15)',
                      color: 'primary.light',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      fontWeight: 600,
                    }}
                  />
                  {school.is_recruiting ? (
                    <Chip
                      icon={<WorkOutlineIcon sx={{ fontSize: '15px !important' }} />}
                      label="Recruiting"
                      color="success"
                      size="small"
                      sx={{
                        fontWeight: 700,
                        boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
                      }}
                    />
                  ) : (
                    <Chip
                      label="Not Recruiting"
                      size="small"
                      variant="outlined"
                      sx={{ color: 'text.secondary', borderColor: 'rgba(255, 255, 255, 0.15)' }}
                    />
                  )}
                  {school.is_active && (
                    <Chip
                      icon={<CheckCircleIcon sx={{ fontSize: '15px !important', color: '#10B981 !important' }} />}
                      label="Active Network Member"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        color: 'text.secondary',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                      }}
                    />
                  )}
                </Box>

                <Typography variant="h3" component="h1" sx={{ fontWeight: 800, color: 'text.primary' }}>
                  {school.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    mt: 0.5,
                  }}
                >
                  <LocationOnOutlinedIcon sx={{ fontSize: 18, color: 'secondary.light' }} />
                  {school.address.district}, {school.address.province}
                </Typography>
              </Box>
            </Box>

            {/* Right: Action Buttons */}
            {school.is_recruiting && (
              <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 'auto' } }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleApplyClick}
                  endIcon={<SendIcon />}
                  sx={{
                    py: 1.5,
                    px: 3.5,
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 2.5,
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      boxShadow: '0 6px 24px rgba(16, 185, 129, 0.5)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  Apply to Teach
                </Button>
              </Box>
            )}
          </Box>
        </Card>

        {/* Highlight Recruiting Announcement Card if is_recruiting */}
        {school.is_recruiting ? (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              bgcolor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: 'rgba(16, 185, 129, 0.2)',
                  color: 'success.light',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <WorkOutlineIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#34D399' }}>
                  Active Faculty Recruitment
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', mt: 0.5 }}>
                  {school.recruiting_note || 'We are currently accepting teacher applications for the upcoming academic school year.'}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="success"
              onClick={handleApplyClick}
              endIcon={<SendIcon sx={{ fontSize: 16 }} />}
              sx={{
                flexShrink: 0,
                alignSelf: { xs: 'stretch', sm: 'center' },
                bgcolor: '#10B981',
                '&:hover': { bgcolor: '#059669' },
              }}
            >
              Submit Application
            </Button>
          </Paper>
        ) : (
          <Alert
            severity="info"
            icon={<InfoOutlinedIcon fontSize="inherit" />}
            sx={{
              mb: 4,
              borderRadius: 3,
              bgcolor: 'rgba(11, 15, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'text.secondary',
            }}
          >
            Faculty recruitment is currently closed for this institution. Please check back regularly for new teaching vacancies.
          </Alert>
        )}

        {/* Institution Stats Quick Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'rgba(17, 24, 39, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <PeopleAltOutlinedIcon sx={{ color: 'primary.light', fontSize: 32, mb: 0.5 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                {school.stats.teacher_count.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontWeight: 600 }}>
                Faculty & Teachers
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'rgba(17, 24, 39, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <SchoolOutlinedIcon sx={{ color: 'secondary.light', fontSize: 32, mb: 0.5 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                {school.stats.student_count.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontWeight: 600 }}>
                Enrolled Students
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'rgba(17, 24, 39, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <ClassOutlinedIcon sx={{ color: 'warning.light', fontSize: 32, mb: 0.5 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                {school.stats.class_count > 0 ? school.stats.class_count.toLocaleString() : 'N/A'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontWeight: 600 }}>
                Active Classes
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'rgba(17, 24, 39, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <CalendarMonthOutlinedIcon sx={{ color: 'success.light', fontSize: 32, mb: 0.5 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                Month {school.settings.academic_year_start_month}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontWeight: 600 }}>
                Academic Start
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Detailed Information Grid */}
        <Grid container spacing={3}>
          {/* Contact Details Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneOutlinedIcon sx={{ color: 'primary.light' }} />
                  Contact Information
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        bgcolor: 'rgba(99, 102, 241, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.light',
                      }}
                    >
                      <PhoneOutlinedIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        Direct Telephone
                      </Typography>
                      <Typography
                        component="a"
                        href={`tel:${school.contact.phone.replace(/\s+/g, '')}`}
                        variant="body1"
                        sx={{
                          color: 'text.primary',
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': { color: 'primary.light' },
                        }}
                      >
                        {school.contact.phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        bgcolor: 'rgba(6, 182, 212, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'secondary.light',
                      }}
                    >
                      <EmailOutlinedIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        Email Address
                      </Typography>
                      <Typography
                        component="a"
                        href={`mailto:${school.contact.email}`}
                        variant="body1"
                        sx={{
                          color: 'text.primary',
                          textDecoration: 'none',
                          fontWeight: 600,
                          wordBreak: 'break-all',
                          '&:hover': { color: 'secondary.light' },
                        }}
                      >
                        {school.contact.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'success.light',
                      }}
                    >
                      <PublicIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        Official Social Media / Fanpage
                      </Typography>
                      <Typography
                        component="a"
                        href={school.contact.fanpage}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body1"
                        sx={{
                          color: 'text.primary',
                          textDecoration: 'none',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          '&:hover': { color: 'success.light' },
                        }}
                      >
                        Visit Official Page <LaunchIcon sx={{ fontSize: 15 }} />
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Location & Address Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnOutlinedIcon sx={{ color: 'secondary.light' }} />
                  Campus Address & Location
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: 'rgba(11, 15, 25, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    mb: 2.5,
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Full Campus Address
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.6 }}>
                    {fullAddress}
                  </Typography>
                </Paper>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Street Address
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
                      {school.address.street}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Ward / Sub-district
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
                      {school.address.ward}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      District / City
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
                      {school.address.district}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Province / Municipality
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
                      {school.address.province} (Code: {school.province_code})
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* System & Administrative Details */}
          <Grid item xs={12}>
            <Card sx={{ p: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeOutlinedIcon sx={{ color: 'warning.light' }} />
                  Institution System Configuration
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Institutional Tenant ID
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, mt: 0.5, wordBreak: 'break-all' }}>
                      {school.id}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Web Identifier (Slug)
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5, color: 'primary.light' }}>
                      {school.slug}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Operating Timezone
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {school.settings.timezone}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Partner Established Date
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {new Date(school.created_at).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Bottom Actions */}
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Button
            component={Link}
            to={`${ROUTE_PATHS.HOME}#sections`}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Back to All Schools
          </Button>

          {school.is_recruiting && (
            <Button
              variant="contained"
              color="success"
              onClick={handleApplyClick}
              endIcon={<SendIcon />}
              sx={{
                py: 1.2,
                px: 3,
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              Apply to {school.name}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};
