import React from 'react';
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
  Chip,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
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
const portfolioValue = [
  { date: '2024-01', value: 100000 },
  { date: '2024-02', value: 105000 },
  { date: '2024-03', value: 110000 },
  { date: '2024-04', value: 108000 },
  { date: '2024-05', value: 115000 },
];

const assetAllocation = [
  { name: 'Stocks', value: 45, color: '#2196f3' },
  { name: 'Bonds', value: 25, color: '#4caf50' },
  { name: 'Crypto', value: 20, color: '#ff9800' },
  { name: 'Cash', value: 10, color: '#9e9e9e' },
];

const holdings = [
  {
    id: 1,
    asset: 'BTC/USDT',
    type: 'Crypto',
    quantity: 0.5,
    avgPrice: 45000,
    currentPrice: 48000,
    value: 24000,
    change: '+6.67%',
  },
  {
    id: 2,
    asset: 'AAPL',
    type: 'Stock',
    quantity: 100,
    avgPrice: 150,
    currentPrice: 165,
    value: 16500,
    change: '+10.00%',
  },
  {
    id: 3,
    asset: 'US Treasury Bond',
    type: 'Bond',
    quantity: 50000,
    avgPrice: 100,
    currentPrice: 102,
    value: 51000,
    change: '+2.00%',
  },
  {
    id: 4,
    asset: 'ETH/USDT',
    type: 'Crypto',
    quantity: 5,
    avgPrice: 2800,
    currentPrice: 3000,
    value: 15000,
    change: '+7.14%',
  },
];

const Portfolio = () => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalChange = '+6.25%'; // This would be calculated based on actual data

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'success' : 'error';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>

      <Grid container spacing={3}>
        {/* Portfolio Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Portfolio Value
              </Typography>
              <Typography variant="h4">${totalValue.toLocaleString()}</Typography>
              <Typography color="success.main">{totalChange}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Number of Assets
              </Typography>
              <Typography variant="h4">{holdings.length}</Typography>
              <Typography color="textSecondary">
                Across {new Set(holdings.map((h) => h.type)).size} categories
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Value Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Value History
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioValue}>
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

        {/* Asset Allocation Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Asset Allocation
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Holdings Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Holdings
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Avg. Price</TableCell>
                    <TableCell align="right">Current Price</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdings.map((holding) => (
                    <TableRow key={holding.id}>
                      <TableCell>{holding.asset}</TableCell>
                      <TableCell>
                        <Chip
                          label={holding.type}
                          size="small"
                          sx={{
                            backgroundColor:
                              assetAllocation.find((a) => a.name === holding.type)
                                ?.color || '#9e9e9e',
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{holding.quantity}</TableCell>
                      <TableCell align="right">
                        ${holding.avgPrice.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        ${holding.currentPrice.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        ${holding.value.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          color={getChangeColor(holding.change)}
                          component="span"
                        >
                          {holding.change}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Portfolio; 