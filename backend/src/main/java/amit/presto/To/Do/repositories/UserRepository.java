package amit.presto.To.Do.repositories;

import amit.presto.To.Do.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserNameAndPassword(String userName, String password);

    User findTopByUserName(String userName);

    User findTopByPassword(String password);

}
