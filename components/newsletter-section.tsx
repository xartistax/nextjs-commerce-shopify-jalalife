"use client";
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function NewsletterForm() {
  const [severity, setSeverity] = useState<'success' | 'error'>('error');
  const [isClient, setIsClient] = useState(false);
  const [formInput, setFormInput] = useState({
    email: '',
    name: '',
    vorname: '',
    message: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return 'NoClient';
  }

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formInput), // Send formInput directly
    });

    const { error, message } = await res.json();
    if (error) {
      setSeverity('error');
      setFormInput((prev) => ({ ...prev, message: error }));
    } else {
      setSeverity('success');
      setFormInput({
        email: '',
        name: '',
        vorname: '',
        message,
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={subscribe}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '100px auto',
        padding: 3,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
        Abonnieren Sie jetzt unseren Newsletter
      </Typography>

      <TextField
        label="Email Adresse"
        type="email"
        variant="outlined"
        value={formInput.email}
        onChange={(e) =>
          setFormInput((prev) => ({ ...prev, email: e.target.value }))
        }
        required
        fullWidth
      />
      <TextField
        label="Vorname"
        type="text"
        variant="outlined"
        value={formInput.vorname}
        onChange={(e) =>
          setFormInput((prev) => ({ ...prev, vorname: e.target.value }))
        }
        required
        fullWidth
      />
      <TextField
        label="Name"
        type="text"
        variant="outlined"
        value={formInput.name}
        onChange={(e) =>
          setFormInput((prev) => ({ ...prev, name: e.target.value }))
        }
        required
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 1, color: 'white' }}
      >
        Jetzt anmelden
      </Button>

      {formInput.message && (
        <Alert severity={severity} sx={{ mt: 2 }}>
          {formInput.message}
        </Alert>
      )}
    </Box>
  );
}
