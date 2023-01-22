import React from 'react';

import { Grid, Button, Drawer, Box } from '@mui/material';
import { useAppStore } from '@hooks/useAppStore';

function ModalMoreResults() {
  const setState = useAppStore(state => state.setState);
  const translateResult = useAppStore(state => state.translateResult);
  const showDetailResult = useAppStore(state => state.showDetailResult);

  return (
    <Drawer
      anchor='bottom'
      open={showDetailResult}
      onClose={() => setState({ showDetailResult: false })}
      elevation={1}
      PaperProps={{
        sx: {
          maxHeight: '80%',
        }
      }}
    >
      <Box>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>
        <p>Lorem impsdasdad</p>

      </Box>
    </Drawer>
  );
}

export default ModalMoreResults;
