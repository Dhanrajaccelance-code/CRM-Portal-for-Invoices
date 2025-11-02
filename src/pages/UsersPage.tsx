import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Person,
  Email,
  Badge,
  CalendarToday,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserListItem, UserFormData } from '../types';
import { usersService } from '../services/users.service';
import { formatDate } from '../utils/helpers';
import { showSuccess, showError } from '../utils/snackbar';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().when('isEditing', {
    is: false,
    then: (schema) => schema.required('Password is required').min(6, 'Password must be at least 6 characters'),
    otherwise: (schema) => schema.min(6, 'Password must be at least 6 characters'),
  }),
  userType: Yup.string().required('User type is required'),
});

export const UsersPage = () => {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserListItem | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: 'CLIENT',
      // isEditing: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (editingUser) {
          await usersService.updateUser(editingUser.id, values as any);
          showSuccess('User updated successfully');
        } else {
          await usersService.createUser(values as any);
          showSuccess('User created successfully');
        }
        setDialogOpen(false);
        setEditingUser(null);
        formik.resetForm();
        loadUsers();
      } catch (error) {
        showError('An error occurred');
      }
    },
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getUsers();
      setUsers(data);
    } catch (error) {
      showError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: UserListItem) => {
    setEditingUser(user);
    formik.setValues({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      password: '', // Don't populate password for security
      userType: user.userType,
      // isEditing: true,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersService.deleteUser(id);
        showSuccess('User deleted successfully');
        loadUsers();
      } catch (error) {
        showError('Failed to delete user');
      }
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    formik.resetForm();
    // formik.setFieldValue('isEditing', false);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    formik.resetForm();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const getUserTypeColor = (userType: string) => {
    switch (userType.toUpperCase()) {
      case 'ADMIN':
        return 'error';
      case 'CLIENT':
        return 'primary';
      case 'STAFF':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
            Users
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{ minWidth: 140 }}
          >
            Add User
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Manage user accounts and permissions
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>User Type</strong></TableCell>
              <TableCell><strong>Roles</strong></TableCell>
              <TableCell><strong>Created</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person color="primary" />
                      <Typography variant="body2" fontWeight={600}>
                        {user.first_name} {user.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Email fontSize="small" color="action" />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.userType}
                      color={getUserTypeColor(user.userType) as any}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {user.roles && user.roles.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {user.roles.map((role) => (
                          <Chip
                            key={role.id}
                            label={role.name}
                            size="small"
                            variant="filled"
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No roles assigned
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday fontSize="small" color="action" />
                      <Typography variant="body2">
                        {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(user)}
                      color="primary"
                      title="Edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(user.id)}
                      color="error"
                      title="Delete"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Form Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && typeof formik.errors.firstName === 'string' ? formik.errors.firstName : ''}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && typeof formik.errors.lastName === 'string' ? formik.errors.lastName : ''}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && typeof formik.errors.email === 'string' ? formik.errors.email : ''}
              />
              <FormControl fullWidth>
                <InputLabel id="userType-label">User Type</InputLabel>
                <Select
                  labelId="userType-label"
                  id="userType"
                  name="userType"
                  value={formik.values.userType}
                  label="User Type"
                  onChange={formik.handleChange}
                  error={formik.touched.userType && Boolean(formik.errors.userType)}
                >
                  <MenuItem value="CLIENT">Client</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="STAFF">Staff</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id="password"
                name="password"
                label={editingUser ? "New Password (leave empty to keep current)" : "Password"}
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && typeof formik.errors.password === 'string' ? formik.errors.password : ''}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => formik.handleSubmit()}
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};