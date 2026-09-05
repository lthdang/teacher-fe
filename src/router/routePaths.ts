export const ROUTE_PATHS = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  SCHEDULE: '/schedule',
  ASSIGNMENTS: '/assignments',
  TEACHERS: '/teachers',
  TEACHER_DETAIL: '/teachers/:id',
  STUDENT_PROFILE: '/profile',
  SETTINGS: '/settings',
  SYSTEM_STATUS: '/system/status',
  SYSTEM_API_DOCS: '/system/api-docs',
  // Reference link to Back-Office admin system
  BACKOFFICE_ADMIN: 'http://localhost:5173/admin',
} as const;
