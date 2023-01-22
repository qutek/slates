import React from 'react';

import { Grid, Button } from '@mui/material';

import TranslateInput from '@components/MainTranslator/Input';
import TranslateResult from '@components/MainTranslator/Result';
import ModalMoreResults from '@components/Modals/ModalMoreResults'

import { useAppStore, useLanguage } from '@hooks/useAppStore';
import { styled } from '@mui/material/styles';

import logo from '@assets/icons/png/48x48.png';

// do custom style here.
const StyledMainTranslator = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  "& > .switch": {
    flexGrow: 0,
    position: 'absolute',
    zIndex: 2,
    width: '60px',
    height: '60px',
    background: theme.palette.background.swapTranslate,
    border: `solid 1px ${theme.palette.background.swapTranslateHover}`,
    borderRadius: '1.3rem',
    margin: 'auto',
    left: '0',
    right: '0',
    top: '70%',
    "&:hover": {
      background: theme.palette.background.swapTranslateHover
    }
  },
}));

const MainTranslator = () => {
  const reverseTranslate = useAppStore(state => state.reverseTranslate);
  const setState = useAppStore(state => state.setState);
  const { source, target } = useLanguage();

  console.log('langs', { source, target })

  const handleSwitch = () => {
    setState({
      reverseTranslate: !reverseTranslate,
    })
  }

  return (
    <StyledMainTranslator>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ height: '100%' }}
      >
        <Grid item xs={6} style={{ height: '100%' }}>
          <TranslateInput lang={source} targetLang={target} />
        </Grid>
        <Grid item xs={6} style={{ height: '100%' }}>
          <TranslateResult lang={target} />
        </Grid>
      </Grid>
      <Button className="switch" onClick={handleSwitch}>
        <img height={48} src={logo} alt="brand" className="brand-img" />
      </Button>
      <ModalMoreResults />
    </StyledMainTranslator>
  );
}

export default MainTranslator
