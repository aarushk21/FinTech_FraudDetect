import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
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

// Mock data for demonstration
const portfolioData = [
  { date: '2024-01', value: 100000 },
  { date: '2024-02', value: 105000 },
  { date: '2024-03', value: 110000 },
  { date: '2024-04', value: 108000 },
  { date: '2024-05', value: 115000 },
];

const tradingData = [
  { date: '2024-01', trades: 15, successful: 12 },
  { date: '2024-02', trades: 18, successful: 15 },
  { date: '2024-03', trades: 20, successful: 16 },
  { date: '2024-04', trades: 16, successful: 14 },
  { date: '2024-05', trades: 22, successful: 18 },
];

const fraudData = [
  { date: '2024-01', detected: 5, prevented: 4 },
  { date: '2024-02', detected: 7, prevented: 6 },
  { date: '2024-03', detected: 4, prevented: 4 },
  { date: '2024-04', detected: 6, prevented: 5 },
  { date: '2024-05', detected: 8, prevented: 7 },
];

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Portfolio Value
              </Typography>
              <Typography variant="h4">$115,000</Typography>
              <Typography color="success.main">+5.2% this month</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Trades
              </Typography>
              <Typography variant="h4">12</Typography>
              <Typography color="success.main">85% success rate</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Fraud Alerts
              </Typography>
              <Typography variant="h4">3</Typography>
              <Typography color="error.main">Requires attention</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2196f3"
                  name="Portfolio Value"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Trading Activity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tradingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="trades"
                  stroke="#2196f3"
                  name="Total Trades"
                />
                <Line
                  type="monotone"
                  dataKey="successful"
                  stroke="#4caf50"
                  name="Successful Trades"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Fraud Detection Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fraudData}>
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
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 