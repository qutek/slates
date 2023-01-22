import { useState, useEffect, useMemo, useCallback } from 'react';
import { Grid, Divider } from '@mui/material';
import find from 'lodash/find';
import debounce from 'lodash/debounce';

import { InputBottomActions, InputTopActions } from './InputActions';
import { useAppStore, useTranslateStore } from '@hooks/useAppStore';
import slates from 'slates';

import translator from '@utils/translator';
import { StyledTranslateGrid } from './styles';

import { LANGUAGES } from '@src/dummy/lang';

const DEBOUNCE_WAIT = 500;

const TranslateInput = ({ lang, targetLang }) => {
  const [value, setValue] = useState('');
  const [isPronouncing, setIsPronouncing] = useState(false);
  const setState = useAppStore(state => state.setState);

  const text = useTranslateStore(state => state.text);
  const setText = useTranslateStore(state => state.setText);

  const currentLang = useMemo(() => find(LANGUAGES, (language) => language.key === lang), [lang]);

  const debounceSetText = useCallback(debounce(val => setText(val), DEBOUNCE_WAIT), []);

  const handleInputChange = useCallback(e => {
    setValue(e.target.value); // update value.
    debounceSetText(e.target.value); // debounce set text to translate.
  }, []);

  const handlePronounce = () => {
    if (!value) return;
    const validLang = 'auto' !== lang ? lang : 'en';
    setIsPronouncing(true);
    translator.pronounce(value, validLang).then(() => setIsPronouncing(false));
  }

  useEffect(() => {
    setValue(text); // update value.
    translator.translate(text, lang, targetLang).then(result => {
      setState({ translateResult: result })
    }).catch(error => {
      console.error('error', error)
    })
  }, [text, lang, targetLang]);

  if (IS_DEV) {
    window.translator = translator;
  }

  return (
    <StyledTranslateGrid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Grid item>
        <div>
          <InputTopActions currentLang={currentLang} />
          <Divider style={{ margin: '10px 0' }} />
        </div>
      </Grid>
      <Grid item xs>
        <div className='textarea'>
          <textarea value={value} onChange={handleInputChange} />
          {/* <IconButton onClick={() => setValue('')}>
            <CloseCircle size="18" />
          </IconButton> */}
        </div>
      </Grid>
      <Grid item>
        <InputBottomActions onCopy={() => slates.invoke('copy', text)} onPronounce={handlePronounce} isPronouncing={isPronouncing} />
      </Grid>
    </StyledTranslateGrid>
  );
}

export default TranslateInput;
