import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  useTheme
} from "@mui/material";


function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const theme = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      setMessage("Login successful");
      setIsSuccess(true);
      window.location.href = '/userProfile'; //Fastest way to do it
    } else {
      setMessage(data.message);
      setIsSuccess(false);
    }
  };

  return (
    <>
    
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: theme.spacing(4), marginTop: theme.spacing(4) }}>
            <Typography variant="h4" gutterBottom align="center">
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box textAlign="center">
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </Box>
            </form>
            {message && (
              <Box mt={2}>
                <Alert severity={isSuccess ? "success" : "error"}>{message}</Alert>
              </Box>
            )}
          </Paper>
        </Container>

    </>
  );
}

export default Login;
