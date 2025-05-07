import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

// Mock data
const priceData = [
  { time: '09:00', price: 100 },
  { time: '10:00', price: 102 },
  { time: '11:00', price: 101 },
  { time: '12:00', price: 103 },
  { time: '13:00', price: 105 },
  { time: '14:00', price: 104 },
  { time: '15:00', price: 106 },
];

const recentTrades = [
  {
    id: 1,
    time: '14:30',
    type: 'BUY',
    amount: 100,
    price: 104.5,
    status: 'Completed',
  },
  {
    id: 2,
    time: '13:45',
    type: 'SELL',
    amount: 50,
    price: 105.2,
    status: 'Completed',
  },
  {
    id: 3,
    time: '12:15',
    type: 'BUY',
    amount: 75,
    price: 103.8,
    status: 'Completed',
  },
];

const Trading = () => {
  const [strategy, setStrategy] = useState('mean_reversion');
  const [amount, setAmount] = useState('');

  const handleStrategyChange = (event: any) => {
    setStrategy(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleTrade = () => {
    // Implement trade execution logic
    console.log('Executing trade:', { strategy, amount });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Trading
      </Typography>

      <Grid container spacing={3}>
        {/* Price Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Price Chart
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2196f3"
                  name="Price"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Trading Controls */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trading Controls
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Strategy</InputLabel>
                <Select
                  value={strategy}
                  label="Strategy"
                  onChange={handleStrategyChange}
                >
                  <MenuItem value="mean_reversion">Mean Reversion</MenuItem>
                  <MenuItem value="momentum">Momentum</MenuItem>
                  <MenuItem value="volatility_breakout">
                    Volatility Breakout
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleTrade}
              >
                Execute Trade
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Trades */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Trades
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTrades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell>{trade.time}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            trade.type === 'BUY'
                              ? 'success.main'
                              : 'error.main',
                        }}
                      >
                        {trade.type}
                      </TableCell>
                      <TableCell align="right">{trade.amount}</TableCell>
                      <TableCell align="right">{trade.price}</TableCell>
                      <TableCell>{trade.status}</TableCell>
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

export default Trading; 