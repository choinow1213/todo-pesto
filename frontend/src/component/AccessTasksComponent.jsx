import * as React from 'react';
import { Component } from "react";
import TaskDataService from "../service/TaskDataService";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

class AccessTasksComponent extends Component {
    constructor(props) {
        super(props);
        const showDone = JSON.parse(localStorage.getItem('showDone')) ?? true;
        this.state = {
            tasks: [],
            title: null, 
            description: null,
            status: null,
            message: null,
            showDone: showDone,
            filterStatus: 'All',
        } 
        this.refreshTasks = this.refreshTasks.bind(this);
        this.updateTaskClicked = this.updateTaskClicked.bind(this);
        this.addTaskClicked = this.addTaskClicked.bind(this);
        this.markTaskAsDone = this.markTaskAsDone.bind(this);
        this.deleteTaskClicked = this.deleteTaskClicked.bind(this);
        this.goBackToLoginScreen = this.goBackToLoginScreen.bind(this);
        this.toggleShowDone = this.toggleShowDone.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount() {
        this.refreshTasks();
    }

    refreshTasks() {
        const { match: { params } } = this.props;
        TaskDataService.getTasksByUserName(params.userName)
            .then(
                response => {
                    if (response.data === undefined) {
                        console.log("New User or Finished all TODO");
                    }
                    this.setState({ tasks: response.data });
                }
            )
    }

    updateTaskClicked(id, title, description) {
        const { match: { params } } = this.props;
        this.props.history.push(`/updateTaskByUserName/${params.userName}/${id}`,
            { title: title, description: description }
        )
    }

    addTaskClicked() {
        const { match: { params } } = this.props;
        this.props.history.push(`/addTaskByUserName/${params.userName}`);
    }

    deleteTaskClicked(id) {
        TaskDataService.deleteItemById(id)
            .then(
                response => {
                    this.setState({ message: `Deletion of task ${id} successful` })
                    this.refreshTasks();
                }
            )
    }

    markTaskAsDone(id) {
        TaskDataService.markTaskAsDone(id)
            .then(
                response => {
                    this.setState({ message: `Marking task ${id} as done successful` })
                    this.refreshTasks();
                }
            )
    }

    toggleShowDone() {
        this.setState(prevState => {
            const newShowDone = !prevState.showDone;
            localStorage.setItem('showDone', JSON.stringify(newShowDone));
            return { showDone: newShowDone };
        });
    }

    handleFilterChange(event) {
        const newFilterStatus = event.target.value;
        this.setState({ filterStatus: newFilterStatus });
        if (newFilterStatus === 'Done') {
            this.setState({ showDone: true });
            localStorage.setItem('showDone', JSON.stringify(true));
        }
    }

    goBackToLoginScreen() {
        this.props.history.push(`/login`);
    }

    render() {
        var tasks_len = this.state.tasks.length;
        return (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main">
                    <CssBaseline />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<LogoutIcon />}
                        onClick={this.goBackToLoginScreen}
                        sx={{ 
                            position: 'sticky', 
                            top: 16, 
                            left: 16, 
                            zIndex: 1000, 
                            mt: 2, 
                            ml: 2 
                        }}
                    >
                        Logout
                    </Button>
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
                            Your Tasks
                        </Typography>
                        <Typography component="h5" variant="h6" sx={{ mt: 2 }}>
                            You have {tasks_len} task(s)
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.showDone}
                                    onChange={this.toggleShowDone}
                                    name="showDone"
                                    color="primary"
                                />
                            }
                            label="Show Completed Tasks"
                            sx={{ mt: 2 }}
                        />
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <InputLabel id="filter-status-label">Filter Status</InputLabel>
                            <Select
                                labelId="filter-status-label"
                                id="filter-status"
                                value={this.state.filterStatus}
                                onChange={this.handleFilterChange}
                                label="Filter Status"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="To Do">To Do</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Not Yet Done">Not Yet Done</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<AddIcon />}
                                onClick={this.addTaskClicked}
                            >
                                Add TODO
                            </Button>
                        </Box>
                        <TableContainer component={Paper} sx={{ mt: 3 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.tasks.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No tasks available
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        this.state.tasks
                                            .filter(task => this.state.showDone || task.status !== 'Done')
                                            .filter(task => this.state.filterStatus === 'All' || task.status === this.state.filterStatus)
                                            .map((task) => (
                                                <TableRow key={task.id}>
                                                    <TableCell>{task.title}</TableCell>
                                                    <TableCell>{task.description}</TableCell>
                                                    <TableCell>{task.status}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            color="warning"
                                                            size="small"
                                                            startIcon={<UpdateIcon />}
                                                            onClick={() => this.updateTaskClicked(task.id, task.title, task.description)}
                                                        >
                                                            Update
                                                        </Button>
                                                        {task.status !== 'Done' && (
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                size="small"
                                                                startIcon={<DoneIcon />}
                                                                onClick={() => this.markTaskAsDone(task.id)}
                                                                sx={{ ml: 1 }}
                                                            >
                                                                Done
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            size="small"
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => this.deleteTaskClicked(task.id)}
                                                            sx={{ ml: 1 }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}
export default AccessTasksComponent;
