package amit.presto.To.Do.repositories;

import amit.presto.To.Do.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    Task findByTitle(String title);

    List<Task> findAllByUserName(String userName);
}
