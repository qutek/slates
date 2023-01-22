import React, { useMemo, useState } from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, TextField, IconButton } from '@mui/material';
import ButtonLanguage from '@components/Buttons/ButtonLanguage';
import { CloseCircle } from 'iconsax-react';

import { useAppStore } from '@hooks/useAppStore';
import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import { LANGUAGES } from '@src/dummy/lang';

const style = {
  position: 'absolute',
  padding: '10px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 5px 15px',
};

const ModalSelectLanguage = () => {
  const [search, setSearch] = useState('');
  const modalLang = useAppStore(state => state.modalLang);
  const setState = useAppStore(state => state.setState);

  const languages = useMemo(() => {
    const searchText = toLower(search);
    return filter(LANGUAGES, lang => {
      const loweredName = toLower(lang.name);
      let valid = loweredName.indexOf(searchText) !== -1;
      if ('targetLang' === modalLang) {
        valid = valid && 'auto' !== lang.key;
      }
      return valid;
    });
  }, [modalLang, search]);

  const handleSelectLanguage = (langKey) => {
    setState({
      modalLang: null,
      [modalLang]: langKey,
    })
  }

  return (
    <Dialog
      open={!!modalLang}
      onClose={() => setState({ modalLang: null })}
      fullWidth={true}
      maxWidth="80%"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <TextField
          label="Search language"
          fullWidth
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: <IconButton onClick={() => setSearch('')}><CloseCircle size="18" /></IconButton>,
          }}
        />
      </DialogTitle>
      <DialogContent>
        <Grid container>
          {languages.length > 0 && languages.map(item => (
            <Grid item xs={2} key={item.key}>
              <ButtonLanguage onClick={() => handleSelectLanguage(item.key)}>{item.name}</ButtonLanguage>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ModalSelectLanguage
