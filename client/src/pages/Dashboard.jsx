import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'admin') {
      const fetchData = async () => {
        const statsRes = await api.get('/admin/stats');
        const usersRes = await api.get('/admin/users');
        setStats(statsRes.data);
        setUsers(usersRes.data);
      };
      fetchData();
    }
  }, [user]);

  if (user?.role !== 'admin') return <Typography>Admin access required</Typography>;

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>Admin Dashboard</Typography>
      
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Statistics</Typography>
        <Typography>Users: {stats.users}</Typography>
        <Typography>Jobs: {stats.jobs}</Typography>
        <Typography>Applications: {stats.applications}</Typography>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;