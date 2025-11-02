import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Settings,
  Zap,
} from 'lucide-react';

export const MaintenancePage = () => {
  const maintenanceStats = [
    {
      title: 'Active Work Orders',
      value: '18',
      change: '+3',
      icon: Wrench,
      color: '#ed6c02',
    },
    {
      title: 'Completed This Month',
      value: '45',
      change: '+12',
      icon: CheckCircle,
      color: '#2e7d32',
    },
    {
      title: 'Maintenance Team',
      value: '6',
      change: '+1',
      icon: Users,
      color: '#1976d2',
    },
    {
      title: 'Urgent Issues',
      value: '3',
      change: '-1',
      icon: AlertTriangle,
      color: '#d32f2f',
    },
  ];

  const workOrders = [
    {
      id: 1,
      title: 'HVAC System Repair - Building A',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Mike Johnson',
      dueDate: '2025-11-02',
      progress: 65,
      category: 'HVAC',
    },
    {
      id: 2,
      title: 'Electrical Panel Upgrade - Floor 3',
      priority: 'Medium',
      status: 'Scheduled',
      assignedTo: 'Sarah Davis',
      dueDate: '2025-11-05',
      progress: 0,
      category: 'Electrical',
    },
    {
      id: 3,
      title: 'Plumbing Leak - Conference Room',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Tom Wilson',
      dueDate: '2025-11-01',
      progress: 80,
      category: 'Plumbing',
    },
    {
      id: 4,
      title: 'Security Camera Installation',
      priority: 'Low',
      status: 'Completed',
      assignedTo: 'Lisa Chen',
      dueDate: '2025-10-28',
      progress: 100,
      category: 'Security',
    },
  ];

  const equipmentStatus = [
    { name: 'HVAC Systems', status: 'Good', count: 12, color: '#2e7d32' },
    { name: 'Electrical Panels', status: 'Warning', count: 8, color: '#ed6c02' },
    { name: 'Plumbing Systems', status: 'Critical', count: 3, color: '#d32f2f' },
    { name: 'Security Systems', status: 'Good', count: 15, color: '#2e7d32' },
    { name: 'Fire Safety', status: 'Good', count: 6, color: '#2e7d32' },
    { name: 'Elevators', status: 'Maintenance', count: 2, color: '#1976d2' },
  ];

  const preventiveMaintenance = [
    { task: 'HVAC Filter Replacement', nextDue: '2025-11-15', frequency: 'Monthly' },
    { task: 'Fire Alarm Testing', nextDue: '2025-11-10', frequency: 'Quarterly' },
    { task: 'Elevator Inspection', nextDue: '2025-11-20', frequency: 'Annual' },
    { task: 'Electrical Safety Check', nextDue: '2025-11-05', frequency: 'Monthly' },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Maintenance Department
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage facility maintenance, repairs, and equipment monitoring
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {maintenanceStats.map((stat, index) => {
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

      {/* Main Content Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
        {/* Work Orders */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Active Work Orders
            </Typography>
            <Box sx={{ mt: 2 }}>
              {workOrders.map((order) => (
                <Box
                  key={order.id}
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
                        {order.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip
                          label={order.priority}
                          size="small"
                          color={order.priority === 'High' ? 'error' : order.priority === 'Medium' ? 'warning' : 'success'}
                        />
                        <Chip
                          label={order.status}
                          size="small"
                          color={
                            order.status === 'Completed' ? 'success' :
                            order.status === 'In Progress' ? 'primary' :
                            order.status === 'Scheduled' ? 'warning' : 'default'
                          }
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {order.category} • Assigned to: {order.assignedTo}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary">
                        Due: {order.dueDate}
                      </Typography>
                    </Box>
                  </Box>
                  {order.status !== 'Completed' && (
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={order.progress} sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Equipment Status */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Equipment Status
            </Typography>
            <Box sx={{ mt: 2 }}>
              {equipmentStatus.map((equipment, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: `${equipment.color}20` }}>
                      <Settings size={16} style={{ color: equipment.color }} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {equipment.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {equipment.count} units
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={equipment.status}
                    size="small"
                    sx={{
                      bgcolor: `${equipment.color}20`,
                      color: equipment.color,
                      fontWeight: 500,
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Preventive Maintenance Schedule */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Preventive Maintenance Schedule
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {preventiveMaintenance.map((task, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Calendar size={16} color="#1976d2" />
                      <Typography variant="body2" fontWeight={600}>
                        {task.nextDue}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {task.task}
                    </Typography>
                    <Chip
                      label={task.frequency}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};