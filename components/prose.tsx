import { Box, Link, List, ListItem, Typography } from '@mui/material';
import parse, { domToReact } from 'html-react-parser';
import { FunctionComponent } from 'react';

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === 'h1') {
        return (
          <Typography
            variant="h1"
            sx={{ mt: 8, fontSize: '5xl', fontWeight: 'bold', textAlign: 'center' }}
          >
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'h2') {
        return (
          <Typography variant="h2" sx={{ mt: 8, fontSize: '4xl', fontWeight: 'semibold' }}>
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'h3') {
        return (
          <Typography variant="h3" sx={{ mt: 8, fontSize: '3xl', fontWeight: 'medium' }}>
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'p') {
        return (
          <Typography variant="body1" sx={{ mb: 2, lineHeight: '1.75' }}>
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'strong') {
        return (
          <Typography component="strong" sx={{ fontWeight: 'bold' }}>
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'a') {
        return (
          <Link
            href={domNode.attribs.href}
            sx={{
              textDecoration: 'underline',
              color: 'black',
              '&:hover': { color: 'neutral.300' }
            }}
          >
            {domToReact(domNode.children, options)}
          </Link>
        );
      }

      if (domNode.name === 'ul') {
        return (
          <List sx={{ mt: 8, pl: 4, listStyleType: 'disc' }}>
            {domToReact(domNode.children, options)}
          </List>
        );
      }

      if (domNode.name === 'ol') {
        return (
          <List sx={{ mt: 8, pl: 4, listStyleType: 'decimal' }}>
            {domToReact(domNode.children, options)}
          </List>
        );
      }

      if (domNode.name === 'li') {
        return (
          <ListItem sx={{ display: 'list-item' }}>{domToReact(domNode.children, options)}</ListItem>
        );
      }

      // Add more cases as needed for other elements
    }
  };

  return <Box className={className}>{parse(html, options)}</Box>;
};

export default Prose;
