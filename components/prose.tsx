import DoneAllIcon from '@mui/icons-material/DoneAll';
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography
} from '@mui/material';
import parse, { domToReact } from 'html-react-parser';
import { FunctionComponent } from 'react';
import { theme } from 'theme';

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  const options = {
    replace: (domNode: any) => {
      // Check for paragraphs and handle divs properly
      if (domNode.name === 'p') {
        return (
          <Typography variant="body1" component="p">
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'div') {
        // Convert divs to Box to avoid being wrapped in p
        return (
          <Box sx={{ mb: 2 }}>
            {' '}
            {/* or whatever styles you need */}
            {domToReact(domNode.children, options)}
          </Box>
        );
      }

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
        return (
          <Typography variant="body1" component="strong" sx={{ fontWeight: 'bold' }}>
            {domToReact(domNode.children, options)}
          </Typography>
        );
      }

      if (domNode.name === 'a') {
        return <Link href={domNode.attribs.href}>{domToReact(domNode.children, options)}</Link>;
      }

      if (domNode.name === 'ul') {
        return (
          <List aria-label="jalaLife" sx={{ display: 'list-item', listStyleType: 'none' }}>
            {domToReact(domNode.children, options)}
          </List>
        );
      }

      if (domNode.name === 'ol') {
        return (
          <List sx={{ listStyleType: 'decimal' }}>{domToReact(domNode.children, options)}</List>
        );
      }

      if (domNode.name === 'li') {
        return (
          <ListItem disablePadding alignItems="flex-start">
            <ListItemIcon sx={{ color: 'primary.light' }}>
              <DoneAllIcon sx={{ minWidth: '36px !important' }} />
            </ListItemIcon>
            <ListItemText
              primary={domToReact(domNode.children, options)}
              primaryTypographyProps={{
                sx: {
                  mb: 0,
                  '& p': {
                    mb: 0 // Disable bottom margin for <p> inside <li>
                  }
                }
              }}
            />
          </ListItem>
        );
      }

      if (domNode.name === 'table') {
        return (
          <TableContainer
            className="productTable"
            component={Paper}
            sx={{ my: 4, p: 4, borderRadius: 2 }}
          >
            <Table sx={{ minWidth: 250 }} className="productTable styled-table">
              {domNode.children.map((child: any, index: number) => {
                if (child.name === 'colgroup') {
                  return null;
                }

                if (child.name === 'thead') {
                  return <TableHead key={index}>{domToReact(child.children, options)}</TableHead>;
                }

                if (child.name === 'tbody') {
                  return <TableBody key={index}>{domToReact(child.children, options)}</TableBody>;
                }

                if (child.name === 'tr') {
                  return (
                    <TableRow key={index}>
                      {domToReact(child.children, {
                        replace: (tdNode: any, tdIndex: number) => {
                          if (tdNode.name === 'td' || tdNode.name === 'th') {
                            return (
                              <TableCell
                                key={tdIndex}
                                padding="normal"
                                sx={{
                                  borderBottom: '1px solid #ddd',
                                  padding: '8px',
                                  textAlign: 'left',
                                  fontWeight: tdIndex === 0 ? 'bold' : 'normal',
                                  '& p': {
                                    mb: 0 // Disable bottom margin for <p> inside <td> or <th>
                                  }
                                }}
                              >
                                {domToReact(tdNode.children, options)}
                              </TableCell>
                            );
                          }
                        }
                      })}
                    </TableRow>
                  );
                }

                return null;
              })}
            </Table>
          </TableContainer>
        );
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={className}>{parse(html, options)}</Box>
    </ThemeProvider>
  );
};

export default Prose;
