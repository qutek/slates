import React, { useRef, useContext } from 'react';

import Navbar from '@components/Navbar';
import MainTranslator from '@components/MainTranslator';
import ModalSelectLanguage from '@components/Modals/ModalSelectLanguage';
import { styled } from '@mui/material/styles';

// do custom style here.
const StyledMainLayout = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection:'column',
  // justifyContent: 'space-between',
}));

const MainLayout = () => {
  return (
    <StyledMainLayout>
      <Navbar />
      <MainTranslator />
      <ModalSelectLanguage />
    </StyledMainLayout>
  )
}

export default MainLayout
