import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export const StyledTranslateGrid = styled(Grid)(({ type, theme }) => ({
  height: '100%',
  padding: '10px',
  background: 'result' === type ? theme.palette.background.secondary : theme.palette.background.default,
  color: theme.palette.text.default,
  "& .textarea": {
    position: 'relative',
    fontSize: '24px',
    height: '100%',
  },
  "& .textarea button": {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  "& .textarea textarea": {
    color: theme.palette.text.default,
    fontSize: '24px',
    width: '100%',
    height: '100%',
  },
}));
