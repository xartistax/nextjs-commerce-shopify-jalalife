"use client";

import CheckIcon from '@mui/icons-material/Check';
import { Alert, Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';



export default function NewsletterForm() {
  const [severity, setSeverity] = useState<'success' | 'error'>('error');
  
  const [formInput, setFormInput] = useState({
    email: '',
    name: '',
    vorname: '',
    message: '',
  });



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
    <>
    
        <Box
      component="form"
      onSubmit={subscribe}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '500px',
        minWidth: '50%',
        margin: '100px auto',
        padding: 3,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" component="h2"  gutterBottom>
      Bleib auf dem Laufenden und profitiere! 🌿
      </Typography>

      <Typography component="p"  gutterBottom>
      Du möchtest von unseren monatlichen Rabatten und exklusiven Angeboten profitieren? Dann melde dich jetzt für unseren Newsletter an!
      <Box component={'strong'} sx={{display:'block', paddingTop: '3rem'}}> 🔔 Deine Vorteile:</Box>
      </Typography>


      <List sx={{ display: 'inline-block' }}>
        {[
          '10% Rabatt auf Ihren ersten Einkauf',
          'Exklusive Aktionen nur für Abonnenten',
          'Spannende Tipps und News rund um natürliche Gesundheit',
          'Einblicke in neue Produkte und Innovationen',
        ].map((item, index) => (
          <ListItem key={index} sx={{ justifyContent: 'center' }}>
            <ListItemIcon sx={{ minWidth: 'auto'}}>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>


      <div className="klaviyo-form-RGaPnH"></div>

      {/* <TextField
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
      </Button> */}


    

      {formInput.message && (
        <Alert severity={severity} sx={{ mt: 2 }}>
          {formInput.message}
        </Alert>
      )}
    </Box>
    </>

  );
}
