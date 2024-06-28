import axios from 'axios'

const TASK_API_URL = 'http://localhost:8080'


class TaskDataService {
    //POST
    createItem(task) {
        return axios.post(`${TASK_API_URL}/addTask`, task);
    }

    createUser(user) {
        return axios.post(`${TASK_API_URL}/createUser`, user)
    }
    //GET
    
    //OPTIONAL Methods
    // getAllItems() {
    //     return axios.get(`${TASK_API_URL}/tasks`);
    // }
    // getItemById(id) {
    //     return axios.get(`${TASK_API_URL}/taskById/${id}`);
    // }
    // getItemByName(name) {
    //     return axios.get(`${TASK_API_URL}/taskByName/${name}`);
    // }

    //To validate if User Exists
    getUserByUserName(userName, password) {
        console.log("IN AXIOS " + userName);
        console.log("IN AXIOS " + password);
        return axios.get(`${TASK_API_URL}/login/${userName}/${password}`)
            .catch(error => {
                console.log(error.response)
            });
    }

    //To get User's todos
    getTasksByUserName(userName) {
        return axios.get(`${TASK_API_URL}/listTaskByUserName/${userName}`)
            .catch(error => {
                console.log(error.response)
            });
    }

    //PUT
    updateItem(task) {
        return axios.put(`${TASK_API_URL}/update`, task);
    }

    //DELETE
    deleteItemById(id) {
        return axios.delete(`${TASK_API_URL}/delete/${id}`)
    }

    markTaskAsDone(id) {
        return axios.put(`${TASK_API_URL}/markTaskAsDone/${id}`)
    }
}

export default new TaskDataService();
