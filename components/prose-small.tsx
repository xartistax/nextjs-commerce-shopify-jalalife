import { Box, ThemeProvider, Typography } from '@mui/material';
import parse, { domToReact } from 'html-react-parser';
import { FunctionComponent } from 'react';
import { theme } from 'theme';

interface TextProps {
  html: string;
  className?: string;
}

const ProseSmall: FunctionComponent<TextProps> = ({ html, className }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === 'h1') {
        return <Typography variant="h1">{domToReact(domNode.children, options)}</Typography>;
      }

      if (domNode.name === 'h2') {
        return (
          <Typography variant="h2" fontSize="2.5rem">
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'h3') {
        return (
          <Typography
            gutterBottom
            component="h3"
            variant="h6"
            sx={{ fontWeight: { xs: 'bold', md: 'normal' } }}
          >
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'strong') {
        return <Typography variant="body1">{domToReact(domNode.children, options)}</Typography>;
      }

      if (domNode.name === 'em') {
        return (
          <Typography variant="body1" component={'em'} sx={{ textDecoration: 'underline' }}>
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'p') {
        const isInsideListItem = domNode.parent && domNode.parent.name === 'li';
        const isInsideTableCell = domNode.parent && domNode.parent.name === 'td';

        return (
          <Typography
            variant="body1"
            sx={{ mb: isInsideListItem || isInsideTableCell ? 0 : 3 }} // No margin if inside <li> or <td>, otherwise apply margin
          >
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      // Add more cases as needed for other elements
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={className}>{parse(html, options)}</Box>
    </ThemeProvider>
  );
};

export default ProseSmall;
