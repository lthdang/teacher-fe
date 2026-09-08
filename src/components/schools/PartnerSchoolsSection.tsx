import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { getTenants, formatSchoolLevel, Tenant } from '../../types/tenant';

interface PartnerSchoolsSectionProps {
  schools?: Tenant[];
}

export const PartnerSchoolsSection: React.FC<PartnerSchoolsSectionProps> = ({ schools }) => {
  const navigate = useNavigate();
  const allSchools = useMemo(() => schools || getTenants(), [schools]);

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [onlyRecruiting, setOnlyRecruiting] = useState(false);

  const filteredSchools = useMemo(() => {
    return allSchools.filter((school) => {
      const matchSearch =
        searchTerm.trim() === '' ||
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.address.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.address.district.toLowerCase().includes(searchTerm.toLowerCase());

      const matchLevel =
        levelFilter === 'all' || school.school_level.toLowerCase() === levelFilter.toLowerCase();

      const matchRecruiting = !onlyRecruiting || school.is_recruiting;

      return matchSearch && matchLevel && matchRecruiting;
    });
  }, [allSchools, searchTerm, levelFilter, onlyRecruiting]);

  return (
    <Box id="sections" sx={{ py: { xs: 8, md: 10 }, flexGrow: 1 }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="overline" sx={{ color: 'primary.light', fontWeight: 700, letterSpacing: '0.1em' }}>
            EDUCATIONAL INSTITUTIONS DIRECTORY
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5 }}>
            Partner Schools & Campuses
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 680, mx: 'auto', mt: 1 }}>
            Browse schools in the network. Select any school to review its detailed profile, academic configuration,
            contact details, and apply for open faculty positions.
          </Typography>
        </Box>

        {/* Search and Filters Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 5,
            borderRadius: 3,
            bgcolor: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Search Input */}
          <TextField
            size="small"
            placeholder="Search schools by name, province, district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', md: 360 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />

          {/* Level Filter Tabs */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', width: { xs: '100%', md: 'auto' } }}>
            <Tabs
              value={levelFilter}
              onChange={(_, val) => setLevelFilter(val)}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 40,
                '& .MuiTab-root': {
                  minHeight: 40,
                  py: 0.5,
                  px: 1.8,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  fontWeight: 600,
                },
              }}
            >
              <Tab label="All Levels" value="all" />
              <Tab label="THPT" value="thpt" />
              <Tab label="THCS" value="thcs" />
              <Tab label="University" value="university" />
            </Tabs>

            {/* Recruiting Only Toggle Chip */}
            <Chip
              icon={<WorkOutlineIcon sx={{ fontSize: '15px !important' }} />}
              label="Recruiting Only"
              clickable
              color={onlyRecruiting ? 'success' : 'default'}
              variant={onlyRecruiting ? 'filled' : 'outlined'}
              onClick={() => setOnlyRecruiting(!onlyRecruiting)}
              sx={{ fontWeight: 600, ml: { md: 1 } }}
            />
          </Box>
        </Paper>

        {/* School Cards Grid */}
        {filteredSchools.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'rgba(17, 24, 39, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              No schools found matching your search criteria.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setSearchTerm('');
                setLevelFilter('all');
                setOnlyRecruiting(false);
              }}
              sx={{ mt: 1 }}
            >
              Reset Filters
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredSchools.map((school: Tenant) => {
              const initials = school.name
                .split(' ')
                .filter((w) => w.length > 0)
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase();

              return (
                <Grid item xs={12} sm={6} md={4} key={school.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 32px -8px rgba(0, 0, 0, 0.5), 0 0 20px 2px rgba(99, 102, 241, 0.15)',
                        borderColor: 'rgba(99, 102, 241, 0.4)',
                      },
                    }}
                    onClick={() => navigate(`/schools/${school.id}`)}
                  >
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      {/* Header: Logo + Badges */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Avatar
                          src={school.settings.logo_url}
                          alt={school.name}
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2.5,
                            bgcolor: school.settings.theme_color || '#6366F1',
                            fontWeight: 700,
                            fontSize: '1rem',
                            border: `1.5px solid ${school.settings.theme_color || 'rgba(255, 255, 255, 0.1)'}80`,
                          }}
                        >
                          {initials}
                        </Avatar>

                        <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                          <Chip
                            label={formatSchoolLevel(school.school_level)}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.75rem',
                              height: 24,
                              color: 'primary.light',
                              borderColor: 'rgba(99, 102, 241, 0.3)',
                              bgcolor: 'rgba(99, 102, 241, 0.08)',
                            }}
                          />
                          {school.is_recruiting && (
                            <Chip
                              icon={<WorkOutlineIcon sx={{ fontSize: '13px !important' }} />}
                              label="Recruiting"
                              size="small"
                              color="success"
                              sx={{
                                fontSize: '0.75rem',
                                height: 24,
                                fontWeight: 700,
                                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                              }}
                            />
                          )}
                        </Box>
                      </Box>

                      {/* School Name */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.3,
                          mb: 1,
                          minHeight: '2.6em',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {school.name}
                      </Typography>

                      {/* Location */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'secondary.light' }} />
                        {school.address.district}, {school.address.province}
                      </Typography>

                      {/* Recruiting Note Preview (if recruiting) */}
                      {school.is_recruiting && school.recruiting_note && (
                        <Box
                          sx={{
                            p: 1.25,
                            mb: 2,
                            borderRadius: 2,
                            bgcolor: 'rgba(16, 185, 129, 0.08)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#34D399',
                              fontWeight: 500,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.4,
                            }}
                          >
                            💡 {school.recruiting_note}
                          </Typography>
                        </Box>
                      )}

                      {/* Quick Stats Overview */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          p: 1.25,
                          borderRadius: 2,
                          bgcolor: 'rgba(11, 15, 25, 0.5)',
                          border: '1px solid rgba(255, 255, 255, 0.04)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <PeopleAltOutlinedIcon sx={{ fontSize: 16, color: 'primary.light' }} />
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>
                              Faculty
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {school.stats.teacher_count}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <SchoolOutlinedIcon sx={{ fontSize: 16, color: 'secondary.light' }} />
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>
                              Students
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {school.stats.student_count.toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>
                            Status
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: school.is_active ? 'success.light' : 'text.disabled',
                            }}
                          >
                            {school.is_active ? 'Active' : 'Inactive'}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />

                    <CardActions sx={{ p: 2, px: 3, display: 'flex', gap: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        component={Link}
                        to={`/schools/${school.id}`}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          fontSize: '0.85rem',
                          py: 0.8,
                        }}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};
