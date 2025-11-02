import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Scale,
  FileText,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

export const LegalPage = () => {
  const legalStats = [
    {
      title: 'Active Cases',
      value: '12',
      change: '+2',
      icon: Scale,
      color: '#1976d2',
    },
    {
      title: 'Pending Reviews',
      value: '8',
      change: '-1',
      icon: FileText,
      color: '#ed6c02',
    },
    {
      title: 'Legal Team',
      value: '5',
      change: '+1',
      icon: Users,
      color: '#2e7d32',
    },
    {
      title: 'Upcoming Deadlines',
      value: '3',
      change: '0',
      icon: Calendar,
      color: '#9c27b0',
    },
  ];

  const activeCases = [
    {
      id: 1,
      title: 'Contract Dispute - ABC Corp',
      status: 'In Progress',
      priority: 'High',
      deadline: '2025-11-15',
      assignedTo: 'Sarah Johnson',
      progress: 75,
    },
    {
      id: 2,
      title: 'Property Lease Agreement',
      status: 'Review',
      priority: 'Medium',
      deadline: '2025-11-20',
      assignedTo: 'Michael Chen',
      progress: 45,
    },
    {
      id: 3,
      title: 'Compliance Audit',
      status: 'Pending',
      priority: 'Low',
      deadline: '2025-11-25',
      assignedTo: 'Emma Davis',
      progress: 20,
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Case file updated', time: '2 hours ago', type: 'update' },
    { id: 2, action: 'New document uploaded', time: '4 hours ago', type: 'upload' },
    { id: 3, action: 'Deadline reminder sent', time: '6 hours ago', type: 'reminder' },
    { id: 4, action: 'Case status changed', time: '1 day ago', type: 'status' },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Legal Department
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage legal cases, contracts, and compliance matters
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {legalStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${stat.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color={stat.color} />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: stat.change.startsWith('+') ? 'success.main' : stat.change.startsWith('-') ? 'error.main' : 'text.secondary',
                      fontWeight: 600,
                    }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Active Cases and Recent Activity */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        {/* Active Cases */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Active Cases
            </Typography>
            <Box sx={{ mt: 2 }}>
              {activeCases.map((case_) => (
                <Box
                  key={case_.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    '&:last-child': { mb: 0 }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="body1" fontWeight={600} gutterBottom>
                        {case_.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={case_.status}
                          size="small"
                          color={case_.status === 'In Progress' ? 'primary' : case_.status === 'Review' ? 'warning' : 'default'}
                        />
                        <Chip
                          label={case_.priority}
                          size="small"
                          color={case_.priority === 'High' ? 'error' : case_.priority === 'Medium' ? 'warning' : 'success'}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary">
                        Due: {case_.deadline}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Assigned to: {case_.assignedTo}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {case_.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={case_.progress} sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
              {recentActivities.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {activity.type === 'update' && <FileText size={16} />}
                    {activity.type === 'upload' && <CheckCircle size={16} />}
                    {activity.type === 'reminder' && <AlertTriangle size={16} />}
                    {activity.type === 'status' && <Clock size={16} />}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};