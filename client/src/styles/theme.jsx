import React from 'react';
import { createTheme, ThemeProvider } from '@shadcn/ui';
import { styled } from '@shadcn/ui/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export const StyledCard = styled('div')({
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  margin: '16px 0',
});

export const StyledButton = styled('button')({
  background: theme.palette.primary.main,
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.primary.dark,
  },
});

export const StyledInput = styled('input')({
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
  },
});

export const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);