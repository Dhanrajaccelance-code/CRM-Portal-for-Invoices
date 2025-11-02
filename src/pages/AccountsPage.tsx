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
  Calculator,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Receipt,
} from 'lucide-react';

export const AccountsPage = () => {
  const accountsStats = [
    {
      title: 'Monthly Expenses',
      value: '$89,450',
      change: '+8.2%',
      icon: Calculator,
      color: '#d32f2f',
    },
    {
      title: 'Invoices Processed',
      value: '156',
      change: '+24',
      icon: FileText,
      color: '#1976d2',
    },
    {
      title: 'Payment Accuracy',
      value: '98.5%',
      change: '+0.3%',
      icon: CheckCircle,
      color: '#2e7d32',
    },
    {
      title: 'Accounts Team',
      value: '4',
      change: '+0',
      icon: Users,
      color: '#9c27b0',
    },
  ];

  const pendingInvoices = [
    {
      id: 1,
      vendor: 'Office Supplies Co.',
      amount: 2450,
      dueDate: '2025-11-05',
      status: 'Pending Approval',
      category: 'Office Supplies',
    },
    {
      id: 2,
      vendor: 'IT Solutions Ltd',
      amount: 8900,
      dueDate: '2025-11-08',
      status: 'Under Review',
      category: 'IT Services',
    },
    {
      id: 3,
      vendor: 'Marketing Agency',
      amount: 12500,
      dueDate: '2025-11-12',
      status: 'Approved',
      category: 'Marketing',
    },
    {
      id: 4,
      vendor: 'Cleaning Services',
      amount: 3200,
      dueDate: '2025-11-03',
      status: 'Overdue',
      category: 'Maintenance',
    },
  ];

  const expenseCategories = [
    { name: 'Office Supplies', amount: 15400, budget: 20000, color: '#1976d2' },
    { name: 'IT & Software', amount: 28500, budget: 35000, color: '#2e7d32' },
    { name: 'Marketing', amount: 18900, budget: 25000, color: '#ed6c02' },
    { name: 'Travel', amount: 12200, budget: 15000, color: '#9c27b0' },
    { name: 'Training', amount: 8750, budget: 10000, color: '#d32f2f' },
  ];

  const recentPayments = [
    { id: 1, description: 'Monthly Internet Bill', amount: 299, date: '2025-10-30', method: 'Bank Transfer' },
    { id: 2, description: 'Office Rent', amount: 2500, date: '2025-10-29', method: 'Check' },
    { id: 3, description: 'Software License', amount: 450, date: '2025-10-28', method: 'Credit Card' },
    { id: 4, description: 'Employee Reimbursements', amount: 1250, date: '2025-10-27', method: 'Direct Deposit' },
  ];

  const taxDeadlines = [
    { task: 'VAT Return Filing', deadline: '2025-11-30', status: 'Upcoming' },
    { task: 'Corporation Tax Payment', deadline: '2025-12-31', status: 'Upcoming' },
    { task: 'PAYE Submission', deadline: '2025-11-22', status: 'Upcoming' },
    { task: 'Annual Accounts Filing', deadline: '2025-12-31', status: 'Upcoming' },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Accounts Department
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage financial transactions, invoices, and accounting operations
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {accountsStats.map((stat, index) => {
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
        {/* Pending Invoices */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Pending Invoices
            </Typography>
            <Box sx={{ mt: 2 }}>
              {pendingInvoices.map((invoice) => (
                <Box
                  key={invoice.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      {invoice.vendor}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Chip
                        label={invoice.category}
                        size="small"
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Due: {invoice.dueDate}
                      </Typography>
                    </Box>
                    <Chip
                      label={invoice.status}
                      size="small"
                      color={
                        invoice.status === 'Approved' ? 'success' :
                        invoice.status === 'Pending Approval' ? 'warning' :
                        invoice.status === 'Under Review' ? 'info' : 'error'
                      }
                    />
                  </Box>
                  <Typography variant="body1" fontWeight={600} color="primary">
                    ${invoice.amount.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Expense Categories
            </Typography>
            <Box sx={{ mt: 2 }}>
              {expenseCategories.map((category, index) => (
                <Box key={index} sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {category.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ${category.amount.toLocaleString()} / ${category.budget.toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(category.amount / category.budget) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: `${category.color}20`,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: category.color,
                        borderRadius: 4,
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {Math.round((category.amount / category.budget) * 100)}% of budget used
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        {/* Recent Payments */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Recent Payments
            </Typography>
            <Box sx={{ mt: 2 }}>
              {recentPayments.map((payment) => (
                <Box
                  key={payment.id}
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
                      {payment.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {payment.date}
                      </Typography>
                      <Chip
                        label={payment.method}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <Typography variant="body1" fontWeight={600} color="error.main">
                    -${payment.amount}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Tax Deadlines */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Tax & Compliance Deadlines
            </Typography>
            <Box sx={{ mt: 2 }}>
              {taxDeadlines.map((deadline, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    '&:last-child': { mb: 0 }
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
                    label={deadline.status}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};