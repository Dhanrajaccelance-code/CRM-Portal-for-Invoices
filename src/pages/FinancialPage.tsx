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
  DollarSign,
  TrendingUp,
  FileText,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  PieChart,
} from 'lucide-react';

export const FinancialPage = () => {
  const financialStats = [
    {
      title: 'Monthly Revenue',
      value: '$125,430',
      change: '+12.5%',
      icon: DollarSign,
      color: '#2e7d32',
    },
    {
      title: 'Profit Margin',
      value: '23.4%',
      change: '+2.1%',
      icon: TrendingUp,
      color: '#1976d2',
    },
    {
      title: 'Pending Invoices',
      value: '15',
      change: '-3',
      icon: FileText,
      color: '#ed6c02',
    },
    {
      title: 'Finance Team',
      value: '8',
      change: '+1',
      icon: Users,
      color: '#9c27b0',
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      description: 'Office Rent Payment',
      amount: -2500,
      type: 'expense',
      date: '2025-10-30',
      category: 'Rent',
    },
    {
      id: 2,
      description: 'Client Payment - ABC Corp',
      amount: 15400,
      type: 'income',
      date: '2025-10-29',
      category: 'Revenue',
    },
    {
      id: 3,
      description: 'Software Subscription',
      amount: -299,
      type: 'expense',
      date: '2025-10-28',
      category: 'Software',
    },
    {
      id: 4,
      description: 'Consulting Services',
      amount: 8750,
      type: 'income',
      date: '2025-10-27',
      category: 'Services',
    },
  ];

  const budgetOverview = [
    { category: 'Operations', budgeted: 45000, spent: 32000, color: '#1976d2' },
    { category: 'Marketing', budgeted: 15000, spent: 12500, color: '#2e7d32' },
    { category: 'IT', budgeted: 25000, spent: 18900, color: '#ed6c02' },
    { category: 'HR', budgeted: 20000, spent: 16800, color: '#9c27b0' },
  ];

  const upcomingDeadlines = [
    { id: 1, task: 'Q4 Tax Filing', deadline: '2025-12-31', priority: 'High' },
    { id: 2, task: 'Annual Audit Preparation', deadline: '2025-11-15', priority: 'High' },
    { id: 3, task: 'Budget Review Meeting', deadline: '2025-11-05', priority: 'Medium' },
    { id: 4, task: 'Financial Statements', deadline: '2025-11-10', priority: 'Medium' },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Financial Department
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage financial operations, budgets, and reporting
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {financialStats.map((stat, index) => {
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
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, mb: 4 }}>
        {/* Recent Transactions */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Recent Transactions
            </Typography>
            <Box sx={{ mt: 2 }}>
              {recentTransactions.map((transaction) => (
                <Box
                  key={transaction.id}
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
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {transaction.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Chip
                        label={transaction.category}
                        size="small"
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        {transaction.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{
                      color: transaction.amount > 0 ? 'success.main' : 'error.main'
                    }}
                  >
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Budget Overview */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Budget Overview
            </Typography>
            <Box sx={{ mt: 2 }}>
              {budgetOverview.map((budget, index) => (
                <Box key={index} sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {budget.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ${budget.spent.toLocaleString()} / ${budget.budgeted.toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(budget.spent / budget.budgeted) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: `${budget.color}20`,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: budget.color,
                        borderRadius: 4,
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {Math.round((budget.spent / budget.budgeted) * 100)}% utilized
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Upcoming Deadlines */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Upcoming Deadlines
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {upcomingDeadlines.map((deadline) => (
                <Grid item xs={12} sm={6} md={3} key={deadline.id}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Calendar size={16} color="#ed6c02" />
                      <Typography variant="body2" fontWeight={600}>
                        {deadline.deadline}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {deadline.task}
                    </Typography>
                    <Chip
                      label={deadline.priority}
                      size="small"
                      color={deadline.priority === 'High' ? 'error' : 'warning'}
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