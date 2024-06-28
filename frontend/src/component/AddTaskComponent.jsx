import * as React from 'react';
import { Component } from "react";
import TaskDataService from "../service/TaskDataService";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';

const defaultTheme = createTheme();

class AddTaskComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            status: 'To Do',
            titleError: '',
            descriptionError: '',
            statusError: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { match: { params } } = this.props;
        let titleError = '';
        let descriptionError = '';
        let statusError = '';

        if (this.state.title.trim() === '') {
            titleError = 'Title cannot be empty';
        }

        if (this.state.description.trim() === '') {
            descriptionError = 'Description cannot be empty';
        }

        if (this.state.status.trim() === '') {
            statusError = 'Status cannot be empty';
        }

        if (titleError || descriptionError || statusError) {
            this.setState({ titleError, descriptionError, statusError });
            return;
        }

        let myTodo = {
            title: this.state.title,
            description: this.state.description,
            status: this.state.status,
            userName: params.userName,
        }
        TaskDataService.createItem(myTodo)
            .then(
                response => {
                    console.log(response.data)
                    this.props.history.push(`/listTaskByUserName/${myTodo.userName}`);
                }
            );
    }

    goBack() {
        const { match: { params } } = this.props;
        this.props.history.push(`/listTaskByUserName/${params.userName}`);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value, titleError: '' })
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value, descriptionError: '' })
    }
    handleStatusChange(e) {
        this.setState({ status: e.target.value, statusError: '' })
    }

    render() {
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
                            Add A New Task
                        </Typography>
                        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                autoComplete="title"
                                autoFocus
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                                error={!!this.state.titleError}
                                helperText={this.state.titleError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                type="text"
                                id="description"
                                autoComplete="description"
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                                error={!!this.state.descriptionError}
                                helperText={this.state.descriptionError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                select
                                name="status"
                                label="Status"
                                id="status"
                                value={this.state.status}
                                onChange={this.handleStatusChange}
                                error={!!this.state.statusError}
                                helperText={this.state.statusError}
                            >
                                <MenuItem value="To Do">To Do</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                            </TextField>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 1, mb: 2 }}
                                onClick={this.goBack}
                                startIcon={<ArrowBackIcon />}
                            >
                                BACK
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

export default AddTaskComponent;
