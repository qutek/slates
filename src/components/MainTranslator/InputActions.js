import { IconButton, Grid, Stack } from '@mui/material';
import { ArrowDown2, ArrowUp2, TagCross, MoreSquare, VolumeLow1, VolumeHigh, Copy, BackSquare, ArrowForwardSquare } from 'iconsax-react';
import ButtonLanguage from '@components/Buttons/ButtonLanguage';
import { useAppStore, useTranslateStore, useTemporalTranslateStore } from '@hooks/useAppStore';

export const InputTopActions = ({ currentLang }) => {
  const modalLang = useAppStore(state => state.modalLang);
  const setState = useAppStore(state => state.setState);
  const clearText = useTranslateStore(state => state.clearText);

  const handleOpenModal = () => {
    setState({
      modalLang: modalLang ? null : 'sourceLang',
    })
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs>
        <ButtonLanguage variant="filled" color="primary">
          {currentLang.name}
        </ButtonLanguage>
        <IconButton aria-label="menu" onClick={handleOpenModal}>
          {modalLang ? <ArrowUp2 size="18" /> : <ArrowDown2 size="18" />}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={() => clearText()} aria-label="redo" size="small">
          <TagCross size="22" variant="Outline" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export const InputBottomActions = ({
  onPronounce,
  isPronouncing,
  onCopy,
}) => {
  const {
    undo,
    redo,
  } = useTemporalTranslateStore();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs>
        <Stack spacing={1} direction="row">
          <IconButton onClick={onPronounce} aria-label="pronounce" size="small" color='default'>
            {isPronouncing ? <VolumeHigh size="22" variant="Bold" /> : <VolumeLow1 size="22" variant="Bold" />}
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <IconButton onClick={() => undo()} aria-label="undo" size="small">
          <BackSquare size="22" variant="Outline" />
        </IconButton>
        <IconButton onClick={() => redo()} aria-label="redo" size="small">
          <ArrowForwardSquare size="22" variant="Outline" />
        </IconButton>
        <IconButton onClick={onCopy} aria-label="listen" size="small">
          <Copy size="22" variant="Outline" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
