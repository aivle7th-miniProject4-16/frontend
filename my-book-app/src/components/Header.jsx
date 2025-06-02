// components/Header.jsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ buttonLabel, buttonPath }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0D1B2A' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          BookHub_6_16
        </Typography>
        <Button color="inherit" onClick={() => navigate(buttonPath)}>
          {buttonLabel}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
