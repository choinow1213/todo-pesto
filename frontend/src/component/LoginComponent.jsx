import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TaskDataService from '../service/TaskDataService';
import Modal from '@mui/material/Modal';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/choinow/">
        @Labuktongbam Amitkumar Sharma
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginComponent(props) {
  const [state, setState] = React.useState({
    userName: '',
    password: '',
    user_fail_login: false,
    userNameError: '',
    passwordError: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
      userNameError: '',
      passwordError: ''
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = state;

    if (userName === '') {
      setState(prevState => ({ ...prevState, userNameError: 'Username cannot be empty' }));
      return;
    }

    if (password === '') {
      setState(prevState => ({ ...prevState, passwordError: 'Password cannot be empty' }));
      return;
    }

    const user = { userName, password };
    TaskDataService.getUserByUserName(user.userName, user.password)
      .then(
        (getResponse) => {
          if (getResponse === undefined) {
            setState({ user_fail_login: true });
          } else {
            let data = getResponse.data;

            if (data === false) { // no user
              setState({ user_fail_login: true });
            } else {
              props.history.push(`/listTaskByUserName/${state.userName}`);
            }
          }
        }
      );
  };

  const handleClose = () => {
    setState(prevState => ({ ...prevState, user_fail_login: false }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="userName"
              autoFocus
              value={state.userName}
              onChange={handleChange}
              error={!!state.userNameError}
              helperText={state.userNameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.password}
              onChange={handleChange}
              error={!!state.passwordError}
              helperText={state.passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/createUser" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Modal
        open={state.user_fail_login}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Login Failed
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            The username or password you entered is incorrect. Please try again.
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}