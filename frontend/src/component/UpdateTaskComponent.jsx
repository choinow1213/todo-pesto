import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AccessTasksComponent from "./AccessTasksComponent";
import TaskDataService from "../service/TaskDataService";

const defaultTheme = createTheme();

class UpdateTaskComponent extends AccessTasksComponent {

    constructor(props) {
        super(props);
        this.state = {
            u_title: this.props.history.location.state.title,
            u_description: this.props.history.location.state.description,
            u_status: '',
            show: false,
            status_empty: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseStatus = this.handleCloseStatus.bind(this);
    }

    handleSubmit() {
        if (this.state.u_status.length === 0) {
            this.setState({ status_empty: true })
        }

        const { match: { params } } = this.props;
        let myUpdatedTodo = {
            id: params.id,
            title: this.state.u_title,
            description: this.state.u_description,
            status: this.state.u_status,
            userName: params.userName
        }
        TaskDataService.updateItem(myUpdatedTodo)
            .then(
                response => {
                    console.log(response.data)
                    this.props.history.push(`/listTaskByUserName/${params.userName}`);
                }
            );
    }

    goBack() {
        const { match: { params } } = this.props;
        this.props.history.push(`/listTaskByUserName/${params.userName}`)
    }

    handleTitleChange(e) {
        this.setState({ u_title: e.target.value })
    }
    handleDescriptionChange(e) {
        this.setState({ u_description: e.target.value })
    }
    
    handleStatusChange(e) {
        this.setState({ u_status: e.target.value })
    }

    handleShow() {
        this.setState({ show: true })
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleCloseStatus() {
        this.setState({ status_empty: false })
    }

    render() {

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
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
                            Update TODO Here
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                autoComplete="title"
                                autoFocus
                                value={this.state.u_title}
                                onChange={this.handleTitleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Updated Description"
                                type="text"
                                id="description"
                                autoComplete="description"
                                value={this.state.u_description}
                                onChange={this.handleDescriptionChange}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    value={this.state.u_status}
                                    onChange={this.handleStatusChange}
                                    fullWidth
                                >
                                    <MenuItem value="To Do">To Do</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Not Yet Done">Not Yet Done</MenuItem>
                                    <MenuItem value="Done">Done</MenuItem>
                                    <MenuItem value={this.state.customStatus}>
                                        {this.state.customStatus}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={this.handleShow}
                            >
                                Submit
                            </Button>
                            <Modal
                                open={this.state.show}
                                onClose={this.handleClose}
                                aria-labelledby="modal-title"
                                aria-describedby="modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }}>
                                    <Typography id="modal-title" variant="h5" component="h2" align="center" mb={6}>
                                        Save Changes?
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Button variant='contained' onClick={this.handleClose} sx={{ flex: 1, mr: 1 }}>Cancel</Button>
                                        <Button variant='contained' color='success' onClick={this.handleSubmit} sx={{ flex: 1, ml: 1 }}>Save Changes</Button>
                                    </Box>
                                </Box>
                            </Modal>
                            { !sessionStorage.getItem('statusModalShown') && (
                                <Modal
                                    open={this.state.status_empty}
                                    onClose={() => {
                                        this.handleCloseStatus();
                                        sessionStorage.setItem('statusModalShown', 'true');
                                    }}
                                    aria-labelledby="modal-title"
                                    aria-describedby="modal-description"
                                >
                                    <Box sx={{ ...style, width: 400 }}>
                                        <Typography id="modal-title" variant="h6" component="h2" align="center">
                                            <b>NOTE</b>
                                        </Typography>
                                        <Typography id="modal-description" sx={{ mt: 2 }} align="center">
                                            You can make changes to your To Do Task and click on Submit to save your task.
                                        </Typography>
                                    </Box>
                                </Modal>
                            )}
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 1, mb: 2 }}
                                onClick={this.goBack}
                            >
                                Go Back
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

export default UpdateTaskComponent;
