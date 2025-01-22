'use client';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Product } from 'lib/shopify/types';

import { useState } from 'react';

interface AddReviewFormProps {
  product: Product; // Define your product ID type accordingly
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ product }) => {
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewBody, setReviewBody] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State to control form submission status

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the rating is 0
    if (rating === 0) {
      setMessage('Bitte wählen Sie eine Bewertung.');
      return; // Stop the form submission
    }

    // Extract product ID from Shopify's Product ID
    const productIdExtracted = product.id.split('/').pop();

    // Build API request URL with query parameters
    const apiUrl = `https://judge.me/api/v1/reviews?name=${encodeURIComponent(reviewerName)}&email=${encodeURIComponent(reviewerEmail)}&rating=${rating}&handle=${product.handle}?body=${encodeURIComponent(
      reviewBody
    )}&id=${productIdExtracted}&shop_domain=bexolutionsteststore.myshopify.com&title=${reviewTitle}&url=jala-life.com`;

    // Prepare headers and options for fetch request
    const myHeaders = new Headers();
    myHeaders.append('Cookie', 'request_method=POST');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const result = await response.text(); // We expect a text response

      if (response.ok) {
        // Set success message
        setMessage('Bewertung wurde erfolgreich übermittelt!');
        setIsSubmitted(true); // Set form submission status to true
        clearForm(); // Clear the form fields (optional)
      } else {
        setMessage(`Fehler: ${result}`);
      }
    } catch (error) {
      setMessage('Leider ist ein Fehler passiert. Probieren Sie es später nochmals');
      console.error('Fetch error:', error);
    }
  };

  // Function to clear form fields (optional)
  const clearForm = () => {
    setReviewerName('');
    setReviewTitle('')
    setReviewerEmail('');
    setRating(0);
    setReviewBody('');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography gutterBottom variant="h3" fontSize={'1.75rem'} fontWeight={900}>
        Bewerten Sie dieses Produkt
      </Typography>

      <form onSubmit={handleSubmit}>


      <FormControl fullWidth margin="normal" disabled={isSubmitted}>
          <TextField
            label="Geben Sie einen Titel an"
            variant="outlined"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            required
          />
        </FormControl>




        <FormControl fullWidth margin="normal" disabled={isSubmitted}>
          <TextField
            label="Ihr Name (Sichtbar für andere Käufer)"
            variant="outlined"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={isSubmitted}>
          <TextField
            label="E-Mail Adresse"
            variant="outlined"
            type="email"
            value={reviewerEmail}
            onChange={(e) => setReviewerEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={isSubmitted}>
          <InputLabel id="rating-label">Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <MenuItem value={0}>Ihre Bewertung</MenuItem>
            <MenuItem value={1}>1 Stern</MenuItem>
            <MenuItem value={2}>2 Sterne</MenuItem>
            <MenuItem value={3}>3 Sterne</MenuItem>
            <MenuItem value={4}>4 Sterne</MenuItem>
            <MenuItem value={5}>5 Sterne</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={isSubmitted}>
          <TextField
            label="Erzählen Sie etwas über das Produkt"
            variant="outlined"
            multiline
            rows={4}
            value={reviewBody}
            onChange={(e) => setReviewBody(e.target.value)}
            required
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitted}>
          <Typography
            variant="button"
            sx={{ color: 'white', fontSize: { md: '0.9rem', xs: '0.63rem' } }}
          >
            {product.title} bewerten
          </Typography>
        </Button>
      </form>

      {/* Show success message if submitted */}
      {isSubmitted && (
        <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}

      {/* Show error message if present */}
      {!isSubmitted && message && (
        <Typography
          variant="body2"
          color={message.includes('erfolgreich') ? 'primary' : 'error'}
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddReviewForm;
