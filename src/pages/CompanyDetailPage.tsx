import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import {
  AccountBalance,
  ArrowBack,
  Business,
  CalendarToday,
  Delete,
  Edit,
  HomeWork,
  LocationOn,
  People,
  TrendingUp,
} from '@mui/icons-material';
import { Company } from '../types';
import { companiesService } from '../services/companies.service';
import { formatDate } from '../utils/helpers';

const GBP_FORMATTER = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const formatCurrency = (value?: number | string | null): string => {
  if (value === undefined || value === null || value === '') {
    return GBP_FORMATTER.format(0);
  }

  if (typeof value === 'number') {
    return GBP_FORMATTER.format(value);
  }

  const trimmed = value.toString().trim();
  if (/^[\u00A3\u0024\u20AC]/.test(trimmed)) {
    return trimmed;
  }

  const numeric = Number(trimmed);
  if (!Number.isNaN(numeric)) {
    return GBP_FORMATTER.format(numeric);
  }

  return trimmed;
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 1,
      borderBottom: '1px solid',
      borderColor: 'divider',
      '&:last-of-type': {
        borderBottom: 'none',
      },
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={500} sx={{ pl: 2, textAlign: 'right' }}>
      {value || 'N/A'}
    </Typography>
  </Box>
);

export const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const loadCompany = async () => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      const data = await companiesService.getCompany(parseInt(id, 10));
      setCompany(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to load company details',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!company?.id) {
      return;
    }

    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companiesService.deleteCompany(company.id);
        setSnackbar({
          open: true,
          message: 'Company deleted successfully',
          severity: 'success',
        });
        setTimeout(() => navigate('/companies'), 1500);
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to delete company',
          severity: 'error',
        });
      }
    }
  };

  useEffect(() => {
    loadCompany();
  }, [id]);

  const portfolioStats = useMemo(() => {
    if (!company) {
      return {
        totalProperties: null,
        activeProperties: null,
        portfolioValue: null,
      };
    }

    return {
      totalProperties:
        company.totalProperties ??
        (company.properties && company.properties.length > 0
          ? company.properties.length
          : null),
      activeProperties: company.activeProperties ?? null,
      portfolioValue: company.portfolioValue ?? null,
    };
  }, [company]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Loading company details...
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (!company) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">Company not found</Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/companies')}
            sx={{ mt: 2 }}
          >
            Back to Companies
          </Button>
        </Box>
      </Container>
    );
  }

  const properties = company.properties ?? [];

  const summaryCards = [
    {
      label: 'Total Properties',
      value:
        portfolioStats.totalProperties !== null
          ? portfolioStats.totalProperties.toString()
          : 'N/A',
      helper: 'Total Properties',
      icon: HomeWork,
    },
    {
      label: 'Total Value',
      value: portfolioStats.portfolioValue
        ? formatCurrency(portfolioStats.portfolioValue)
        : 'N/A',
      helper: 'Portfolio Value',
      icon: AccountBalance,
    },
    {
      label: 'Active Properties',
      value:
        portfolioStats.activeProperties !== null
          ? portfolioStats.activeProperties.toString()
          : 'N/A',
      helper: 'Active Properties',
      icon: TrendingUp,
    },
  ];

  const overviewItems = [
    {
      label: 'Company Type',
      value: company.companyType || company.natureOfBusiness || 'N/A',
    },
    {
      label: 'Status',
      value: company.status || 'Active',
    },
    {
      label: 'Company Number',
      value: company.companyNumber,
    },
    {
      label: 'SIC Code',
      value: company.sicCode,
    },
    {
      label: 'Portfolio Value',
      value:
        portfolioStats.portfolioValue !== null
          ? formatCurrency(portfolioStats.portfolioValue)
          : 'N/A',
    },
    {
      label: 'Total Properties',
      value:
        portfolioStats.totalProperties !== null
          ? portfolioStats.totalProperties.toString()
          : 'N/A',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              variant="contained"
              color="inherit"
              onClick={() => navigate('/companies')}
              sx={{
                alignSelf: { xs: 'stretch', sm: 'flex-start' },
                bgcolor: '#e8eefc',
                color: '#1f2937',
                '&:hover': {
                  bgcolor: '#d5dff8',
                },
              }}
            >
              Back to Companies
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Business color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h4" component="h1" fontWeight={700}>
                {company.name}
              </Typography>
            </Box>
            <Chip
              label={company.natureOfBusiness || 'N/A'}
              color="primary"
              variant="outlined"
              sx={{ width: 'fit-content' }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => navigate(`/companies/${company.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2.5,
            mb: 4,
          }}
        >
          {summaryCards.map(({ label, value, helper, icon: Icon }) => (
            <Card
              key={label}
              sx={{
                borderRadius: 3,
                boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {helper}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: 3,
            mb: 4,
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Company Overview
              </Typography>
              <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                {overviewItems.map(({ label, value }) => (
                  <InfoRow key={label} label={label} value={value || 'N/A'} />
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Properties List
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  mt: 2,
                  maxHeight: 320,
                  overflowY: 'auto',
                  pr: 1,
                }}
              >
                {properties.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No properties recorded for this company yet.
                  </Typography>
                )}
                {properties.map((property) => (
                  <Box
                    key={property.id ?? property.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      px: 2,
                      py: 1.5,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {property.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {property.status || 'Status unknown'}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      color="success"
                      onClick={() => navigate('/property-management')}
                    >
                      View Details &gt;
                    </Button>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CalendarToday color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Key Dates
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Incorporation Date
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {formatDate(company.incorporationDate)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Confirmation Statement Due
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {formatDate(company.confirmationStatementDue)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Accounts Due
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {formatDate(company.accountsDue)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <People color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Directors & Shareholding
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Directors
                  </Typography>
                  <Typography variant="body1">{company.directors || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Shareholding
                  </Typography>
                  <Typography variant="body1">{company.shareholding || 'N/A'}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LocationOn color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Registered Address
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Primary Location
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {company.registeredAddress}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
