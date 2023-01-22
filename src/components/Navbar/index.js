import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Maximize, Maximize1, Maximize3, Maximize4, CloseSquare, ReceiveSquare } from 'iconsax-react';
import slates from 'slates';
import { styled } from '@mui/material/styles';
import { useAppStore } from '@src/hooks/useAppStore';

// do custom style here.
const StyleAppBar = styled(AppBar)(({ theme }) => ({
  WebkitAppRegion: 'drag',
  zIndex: 1,
}));

const StyledBoxNoDrag = styled(Box)(({ theme }) => ({
  WebkitAppRegion: 'no-drag',
}));

const Navbar = () => {
  const setState = useAppStore(state => state.setState);
  return (
    <StyleAppBar position="static">
      <Toolbar variant="dense">
        <StyledBoxNoDrag>
          <IconButton onClick={() => slates.invoke('window', 'close')} sx={{ padding: '2px' }} edge="start" disableRipple>
            <CloseSquare size="18" color='#FF605C' variant="Bold" />
          </IconButton>
          <IconButton onClick={() => slates.invoke('window', 'minimize')} sx={{ padding: '2px' }} disableRipple>
            <ReceiveSquare size="18" color='#FFBD44' variant="Bold" />
          </IconButton>
          <IconButton onClick={() => slates.invoke('window', 'fullscreen')} sx={{ padding: '2px' }} disableRipple>
            <Maximize3 size="18" color="#00CA4E" variant="Bold" />
          </IconButton>
        </StyledBoxNoDrag>
        <Box>
          {/* <IconButton onClick={() => setState({ useMini: true })} sx={{ padding: '2px' }} edge="end" disableRipple>
            <Maximize size="18" variant="TwoTone" />
          </IconButton> */}
        </Box>
      </Toolbar>
    </StyleAppBar>
  );
}

export default Navbar
