import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const fraudMetrics = [
  { date: '2024-01', detected: 5, prevented: 4, falsePositives: 1 },
  { date: '2024-02', detected: 7, prevented: 6, falsePositives: 1 },
  { date: '2024-03', detected: 4, prevented: 4, falsePositives: 0 },
  { date: '2024-04', detected: 6, prevented: 5, falsePositives: 1 },
  { date: '2024-05', detected: 8, prevented: 7, falsePositives: 1 },
];

const fraudAlerts = [
  {
    id: 1,
    timestamp: '2024-05-15 14:30',
    type: 'Suspicious Transaction',
    amount: 25000,
    status: 'Pending',
    risk: 'High',
    details: 'Unusual transaction pattern detected',
  },
  {
    id: 2,
    timestamp: '2024-05-15 13:15',
    type: 'Multiple Failed Logins',
    amount: 0,
    status: 'Pending',
    risk: 'Medium',
    details: 'Multiple failed login attempts from new IP',
  },
  {
    id: 3,
    timestamp: '2024-05-15 11:45',
    type: 'Unusual Trading Pattern',
    amount: 15000,
    status: 'Resolved',
    risk: 'Low',
    details: 'Unusual trading volume detected',
  },
];

const FraudDetection = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAlert(null);
  };

  const handleApprove = () => {
    // Implement approve logic
    console.log('Approving alert:', selectedAlert);
    handleCloseDialog();
  };

  const handleReject = () => {
    // Implement reject logic
    console.log('Rejecting alert:', selectedAlert);
    handleCloseDialog();
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Fraud Detection
      </Typography>

      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Alerts
              </Typography>
              <Typography variant="h4">2</Typography>
              <Typography color="error.main">Requires attention</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Detection Rate
              </Typography>
              <Typography variant="h4">95%</Typography>
              <Typography color="success.main">+2% this month</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                False Positives
              </Typography>
              <Typography variant="h4">4</Typography>
              <Typography color="success.main">-1% this month</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Fraud Metrics Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Fraud Detection Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fraudMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="detected"
                  stroke="#f44336"
                  name="Detected Cases"
                />
                <Line
                  type="monotone"
                  dataKey="prevented"
                  stroke="#4caf50"
                  name="Prevented Cases"
                />
                <Line
                  type="monotone"
                  dataKey="falsePositives"
                  stroke="#ff9800"
                  name="False Positives"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Fraud Alerts Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Alerts
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Risk Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fraudAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{alert.timestamp}</TableCell>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell align="right">
                        {alert.amount > 0 ? `$${alert.amount}` : '-'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={alert.risk}
                          color={getRiskColor(alert.risk)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={alert.status}
                          color={alert.status === 'Pending' ? 'warning' : 'success'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(alert)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Alert Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedAlert && (
          <>
            <DialogTitle>
              Alert Details
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Type: {selectedAlert.type}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Time: {selectedAlert.timestamp}
                </Typography>
                {selectedAlert.amount > 0 && (
                  <Typography variant="subtitle1" gutterBottom>
                    Amount: ${selectedAlert.amount}
                  </Typography>
                )}
                <Typography variant="subtitle1" gutterBottom>
                  Risk Level:{' '}
                  <Chip
                    label={selectedAlert.risk}
                    color={getRiskColor(selectedAlert.risk)}
                    size="small"
                  />
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Details: {selectedAlert.details}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleReject}
                color="error"
                startIcon={<CloseIcon />}
              >
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                color="success"
                startIcon={<CheckCircleIcon />}
              >
                Approve
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default FraudDetection; 