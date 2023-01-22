import { IconButton, Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// do custom style here.
const StyledStyledMiniLayout = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.default,
  height: '100vh',
  display: 'flex',
  flexDirection:'column',
}));

const MiniLayout = () => {
  return (
    <StyledStyledMiniLayout>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ height: '100%' }}
      >
        <Grid item xs={6} style={{ height: '100%' }}>
          dsadasdsd
        </Grid>
        <Grid item xs={6} style={{ height: '100%' }}>
          dsadsdsda
        </Grid>
      </Grid>
    </StyledStyledMiniLayout>
  )
}

export default MiniLayout
