import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Paper
} from "@mui/material";
import APIService from '../services/APIService';
function Home() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async (token: string | null) => {
      if (token) {
        try {
          const response = await APIService.request("/user", "GET", null, true);
          setUsername(response.user.username);
        } catch (error) {
          console.error("Error fetching user");
        }
      }
      setLoading(false);
    };
  
    fetchUser(localStorage.getItem('token') || null);
  }, []);
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h2" gutterBottom align="center">
          Home
        </Typography>
        {username ? (
          <Typography variant="h5" align="center">
            Welcome, {username}!
            <br/>
            <Button variant="text" color="primary" onClick={() => window.location.href = '/userProfile'}>Profile Page</Button>
          </Typography>
        ) : (
          <Typography variant="h6" align="center">
            Please<Link to="/login"><Button variant="text" color="primary">login</Button></Link>or
            <Link to="/register"><Button variant="text" color="secondary">register</Button></Link>
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default Home;
