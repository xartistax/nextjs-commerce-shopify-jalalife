'use client';
import { Typography, styled } from '@mui/material';

export const TruncatedText = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
