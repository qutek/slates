import React from 'react';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';

// do custom style here.
const ButtonLanguage = styled(Button)(({ theme }) => ({
  color: theme.palette.text.default,
  // backgroundColor: 'background.paper',
}));

export default ButtonLanguage;
