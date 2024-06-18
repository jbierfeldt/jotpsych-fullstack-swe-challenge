import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Avatar,
  useTheme
} from '@mui/material';
import APIService from '../services/APIService';

const UserProfile: React.FC = () => {
  const [motto, setMotto] = useState('My motto goes here!');
  const [username, setUsername] = useState<string>("");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchUser = async (token: string | null) => {
      if (token) {
        try {
          const response = await APIService.request("/user", "GET", null, true, true);
          setUsername(response.user.username);
          setMotto(response.user.motto || 'My motto goes here!');
        } catch (error) {
          console.error("Error fetching user");
        }
      }
    };

    fetchUser(localStorage.getItem('token') || null);
  }, []);

  const handleNewMotto = async () => {
    if (recording) {
      mediaRecorder?.stop();
      setRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'motto.webm');

        try {
          const response = await APIService.request('/upload', 'POST', formData, true, false);
          setMotto(response.transcription);
        } catch (error) {
          console.error('Error uploading audio', error);
        }
        audioChunks.current = [];
      };

      recorder.start();
      setRecording(true);

      setTimeout(() => {
        if (recording) {
          recorder.stop();
          setRecording(false);
        }
      }, 15000); // Stop recording after 15 seconds
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: theme.spacing(4), marginTop: theme.spacing(4), textAlign: 'center' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar sx={{ width: 60, height: 60, mb: 2 }}>
            <svg width="60" height="60" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" fill="#ccc" />
              <path d="M12 12c-4.4 0-8 3.6-8 8h16c0-4.4-3.6-8-8-8z" fill="#ccc" />
            </svg>
          </Avatar>
          <Typography variant="h6">{username}</Typography>
        </Box>
        <Typography variant="h5" gutterBottom>
          {motto}
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={3}>
          <Button variant="contained" color="success" onClick={handleNewMotto}>
            {recording ? 'Stop Recording' : 'Record (New) Motto'}
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
