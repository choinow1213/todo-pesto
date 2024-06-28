package amit.presto.To.Do.controller;

import amit.presto.To.Do.entity.Task;
import amit.presto.To.Do.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class TaskController {
    @Autowired
    private TaskService taskService;
    private final Logger logger = LoggerFactory.getLogger(TaskController.class);
    //POST
    @PostMapping("/addTask")
    public Task addTask(@RequestBody Task task) {
        logger.info("Task object {}", task.toString());
        return taskService.saveTask(task);
    }

    @PostMapping("/addTasks")
    public List<Task> addTasks(@RequestBody List<Task> task) {
        return taskService.saveTasks(task);
    }

    //GET
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskService.getTasks();
    }
    @GetMapping("/taskById/{id}")
    public Task findTaskById(@PathVariable int id) {
        return taskService.getTaskById(id);
    }
    @GetMapping("/taskByName/{name}")
    public Task findTaskByName(@PathVariable String title) {
        return taskService.getTaskByTitle(title);
    }
    @GetMapping("/listTaskByUserName/{userName}")
    public List<Task> findTasksByUserName(@PathVariable String userName) {
        return taskService.getTasksForUser(userName);
    }

    //PUT
    @PutMapping("/update")
    public Task updateTask(@RequestBody Task task)
    {
        System.out.println("UPDATED");
        return taskService.updateTask(task);
    }


    //DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable int id) {
        return taskService.deleteTask(id);
    }

    @PutMapping("/markTaskAsDone/{id}")
    public Task markTaskAsDone(@PathVariable int id)
    {
        return taskService.markAsDone(id);
    }

}
