import { useMemo, useState } from 'react';
import { Grid, Divider, Snackbar, Alert } from '@mui/material';
import find from 'lodash/find';
import slates from 'slates';
import { useAppStore } from '@hooks/useAppStore';
import translator from '@utils/translator';
import { ResultBottomActions, ResultTopActions } from './ResultActions';
import { StyledTranslateGrid } from './styles';
import { LANGUAGES } from '@src/dummy/lang';

const TranslateResult = ({ lang }) => {
  const [isPronouncing, setIsPronouncing] = useState(false);
  const [copying, setCopying] = useState(false);
  const translateResult = useAppStore(state => state.translateResult);

  const currentLang = useMemo(() => find(LANGUAGES, (language) => language.key === lang), [lang]);

  const handleCopy = () => !!translateResult?.mainMeaning && slates.invoke('copy', translateResult?.mainMeaning).then(() => setCopying(true));

  const handlePronounce = () => {
    if (!translateResult?.mainMeaning) return;
    setIsPronouncing(true);
    translator.pronounce(translateResult?.mainMeaning, lang).then(() => setIsPronouncing(false));
  }

  return (
    <StyledTranslateGrid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      type="result"
    >
      <Grid item>
        <div>
          <ResultTopActions currentLang={currentLang} />
          <Divider style={{ margin: '10px 0' }} />
        </div>
      </Grid>
      <Grid item xs>
        <div className='textarea'>
          <span>{translateResult?.mainMeaning}</span>
          {/* <IconButton>
            <Star1 size="18" />
          </IconButton> */}
        </div>
      </Grid>
      <Grid item>
        <ResultBottomActions onCopy={handleCopy} onPronounce={handlePronounce} isPronouncing={isPronouncing} />
      </Grid>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={copying} autoHideDuration={3000} onClose={() => setCopying(false)}>
        <Alert onClose={() => setCopying(false)} severity="success" sx={{ width: '100%' }}>
          Text Copied!
        </Alert>
      </Snackbar>
    </StyledTranslateGrid>
  );
}

export default TranslateResult;
