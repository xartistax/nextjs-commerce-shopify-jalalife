import { Box, useTheme } from '@mui/material';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 2, // corresponds to rounded-lg
        border: 2,
        backgroundColor: 'background.paper', // corresponds to bg-white
        borderColor: active
          ? theme.palette.primary.main // corresponds to border-blue-600
          : theme.palette.mode === 'dark'
            ? theme.palette.grey[800] // corresponds to dark:border-neutral-800
            : theme.palette.grey[200], // corresponds to border-neutral-200
        '&:hover': {
          borderColor: isInteractive
            ? theme.palette.primary.main // corresponds to hover:border-blue-600
            : undefined
        },
        position: label ? 'relative' : undefined
      }}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
          className={isInteractive ? 'transition duration-300 ease-in-out' : ''}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            ...(isInteractive && {
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)' // corresponds to group-hover:scale-105
              }
            })
          }}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </Box>
  );
}
