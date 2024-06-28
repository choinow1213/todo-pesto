package amit.presto.To.Do.service;

import amit.presto.To.Do.entity.User;
import amit.presto.To.Do.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User getUser(User user) {
        System.out.println("Service GET *****");
        return userRepository.findByUserNameAndPassword(user.getUserName(), user.getPassword());
    }
    public boolean getUserByUserName(String userName, String password) {

        boolean userName_present;
        boolean password_present;
        try {
            userName_present = userRepository.findTopByUserName(userName) != null;
            System.out.println("UserName present: " + userName_present);
            password_present = userRepository.findTopByPassword(password) != null;
            System.out.println("Password present: " + password_present);
        } catch(NonUniqueResultException nre) {
            return true;
        }
        return userName_present && password_present;
    }

    public boolean findUserByUserName(String userName) {
        boolean userName_present;
        try {
            userName_present = userRepository.findTopByUserName(userName) != null;
            System.out.println("UserName present (U): " + userName_present);
        } catch(NonUniqueResultException nre) {
            return true;
        }
        return userName_present;
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
