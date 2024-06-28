package amit.presto.To.Do.service;

import amit.presto.To.Do.entity.Task;
import amit.presto.To.Do.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    //POST
    public Task saveTask(Task task) {
        System.out.println(task.toString());
        return taskRepository.save(task);
    }
    public Task saveTaskForUserName(Task task) {
        System.out.println(task.toString());
        return taskRepository.save(task);
    }
    public List<Task> saveTasks(List<Task> task) {
        return taskRepository.saveAll(task);
    }

    //GET
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }
    public Task getTaskById(int id) {
        return taskRepository.findById(id).orElse(null);
    }
    public Task getTaskByTitle(String title) {
        return taskRepository.findByTitle(title);
    }
    public List<Task> getTasksForUser(String userName) {
        return taskRepository.findAllByUserName(userName);
    }

    //PUT
    public Task updateTask(Task task) {
        System.out.println("updates");
        Task existing_task = taskRepository.findById(task.getId()).orElse(null);
        assert existing_task != null;
        existing_task.setTitle(task.getTitle());
        existing_task.setDescription(task.getDescription());
        existing_task.setStatus(task.getStatus());
        return taskRepository.save(existing_task);
    }

    //DELETE
    public String deleteTask(int id) {
        taskRepository.deleteById(id);
        return id + " id -> task removed/completed";
    }

    //PUT
    public Task markAsDone(int id) {
        Task existing_task = taskRepository.findById(id).orElse(null);
        assert existing_task != null;
        existing_task.setStatus("Done");
        return taskRepository.save(existing_task);
    }
}
