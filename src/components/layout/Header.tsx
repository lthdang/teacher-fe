import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LaunchIcon from '@mui/icons-material/Launch';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ROUTE_PATHS } from '../../router/routePaths';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenDetails = () => {
    handleCloseUserMenu();
    setDetailsDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsDialogOpen(false);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    setMobileMenuOpen(false);
    await logout();
    navigate(ROUTE_PATHS.HOME);
  };

  const displayName = user?.full_name || user?.fullName || (user?.email ? user.email.split('@')[0] : 'User');
  const userInitial = displayName.charAt(0).toUpperCase();

  const handleNavClick = (hash: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== ROUTE_PATHS.HOME) {
      navigate(`${ROUTE_PATHS.HOME}${hash}`);
    } else {
      const elem = document.querySelector(hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 70 }}>
            {/* Logo / Brand */}
            <Box
              component={Link}
              to={ROUTE_PATHS.HOME}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                }}
              >
                <SchoolIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />
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

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2.5 }}>
              <Button onClick={() => handleNavClick('#overview')} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                Overview
              </Button>
              <Button onClick={() => handleNavClick('#sections')} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                System Sections
              </Button>
              <Button onClick={() => handleNavClick('#ecosystem')} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                Ecosystem
              </Button>
              <Button
                variant="text"
                color="primary"
                href={ROUTE_PATHS.BACKOFFICE_ADMIN}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                sx={{ color: 'primary.light', fontSize: '0.875rem' }}
              >
                Back-Office Portal
              </Button>
            </Box>

            {/* Right Action Section: Log In / Sign Up OR User Avatar */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              {!isAuthenticated ? (
                <>
                  <Button
                    component={Link}
                    to={ROUTE_PATHS.LOGIN}
                    variant="outlined"
                    color="primary"
                    sx={{
                      py: 0.8,
                      px: 2.2,
                      fontSize: '0.875rem',
                      borderRadius: 2,
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    component={Link}
                    to={ROUTE_PATHS.SIGN_UP}
                    variant="contained"
                    color="primary"
                    sx={{
                      py: 0.8,
                      px: 2.5,
                      fontSize: '0.875rem',
                      borderRadius: 2,
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    onClick={handleOpenUserMenu}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 0.75,
                      pl: 1.25,
                      borderRadius: 3,
                      cursor: 'pointer',
                      bgcolor: 'rgba(99, 102, 241, 0.08)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(99, 102, 241, 0.16)',
                        borderColor: 'rgba(99, 102, 241, 0.4)',
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
                        {displayName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'primary.light', fontSize: '0.7rem' }}>
                        {user?.status || 'Active'}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: 'primary.main',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)',
                      }}
                    >
                      {userInitial}
                    </Avatar>
                  </Box>

                  {/* Dropdown Menu */}
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        width: 260,
                        bgcolor: '#111827',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        boxShadow: '0 12px 28px rgba(0,0,0,0.5)',
                        p: 1,
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {displayName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }} noWrap>
                        {user?.email}
                      </Typography>
                      <Chip
                        icon={<CheckCircleOutlineIcon sx={{ fontSize: '14px !important' }} />}
                        label={user?.status || 'Active'}
                        color="success"
                        size="small"
                        sx={{ fontSize: '0.7rem', height: 22 }}
                      />
                    </Box>
                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                    <MenuItem onClick={handleOpenDetails} sx={{ borderRadius: 1.5, py: 1 }}>
                      <ListItemIcon sx={{ color: 'primary.light', minWidth: 32 }}>
                        <PersonOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="User Details" primaryTypographyProps={{ fontSize: '0.875rem' }} />
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ borderRadius: 1.5, py: 1, color: '#EF4444' }}>
                      <ListItemIcon sx={{ color: '#EF4444', minWidth: 32 }}>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Log Out" primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 600 }} />
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>

            {/* Mobile Menu Toggle Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              {isAuthenticated && (
                <Avatar
                  onClick={() => setDetailsDialogOpen(true)}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {userInitial}
                </Avatar>
              )}
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
          sx: { width: 300, bgcolor: 'background.paper', p: 2.5 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SchoolIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Teacher
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileMenuOpen(false)} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Mobile Auth Status */}
        {isAuthenticated && user ? (
          <Box sx={{ p: 2, bgcolor: 'rgba(99, 102, 241, 0.08)', borderRadius: 2.5, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontWeight: 700 }}>
                {userInitial}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {displayName}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              color="primary"
              onClick={handleOpenDetails}
              startIcon={<PersonOutlineIcon sx={{ fontSize: 16 }} />}
              sx={{ mt: 1 }}
            >
              View User Details
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
            <Button
              component={Link}
              to={ROUTE_PATHS.LOGIN}
              variant="outlined"
              fullWidth
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to={ROUTE_PATHS.SIGN_UP}
              variant="contained"
              fullWidth
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Button>
          </Box>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Mobile Navigation List */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavClick('#overview')}>
              <ListItemText primary="Overview" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavClick('#sections')}>
              <ListItemText primary="System Sections" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavClick('#ecosystem')}>
              <ListItemText primary="Ecosystem" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mt: 1.5 }}>
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

          {isAuthenticated && (
            <ListItem disablePadding sx={{ mt: 3 }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  bgcolor: 'rgba(239, 68, 68, 0.1)',
                  color: '#EF4444',
                  borderRadius: 1.5,
                  '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' },
                }}
              >
                <ListItemIcon sx={{ color: '#EF4444', minWidth: 36 }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Log Out" primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>

      {/* User Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={handleCloseDetails}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#111827',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44, fontWeight: 700 }}>
              {userInitial}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {displayName}
              </Typography>
              <Chip
                label={user?.status || 'Active'}
                color="success"
                size="small"
                sx={{ height: 20, fontSize: '0.65rem', mt: 0.5 }}
              />
            </Box>
          </Box>
          <IconButton onClick={handleCloseDetails} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', py: 2.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailOutlinedIcon sx={{ color: 'primary.light', fontSize: 20 }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Email Address
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {user?.email || 'N/A'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PhoneOutlinedIcon sx={{ color: 'primary.light', fontSize: 20 }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Phone Number
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {user?.phone || 'Not provided'}
                </Typography>
              </Box>
            </Box>

            {user?.id && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FingerprintIcon sx={{ color: 'primary.light', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    User ID
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', fontFamily: 'monospace', color: 'text.primary' }}>
                    {user.id}
                  </Typography>
                </Box>
              </Box>
            )}

            {(user?.created_at || user?.createdAt) && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AccessTimeIcon sx={{ color: 'primary.light', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Member Since
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {new Date(user.created_at || user.createdAt || '').toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button
            onClick={handleLogout}
            color="error"
            variant="outlined"
            startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
            sx={{ borderRadius: 2 }}
          >
            Log Out
          </Button>
          <Button onClick={handleCloseDetails} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
