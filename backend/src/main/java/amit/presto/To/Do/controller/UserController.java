package amit.presto.To.Do.controller;

import amit.presto.To.Do.entity.User;
import amit.presto.To.Do.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = { "http://localhost:3000"})
public class UserController {

    @Autowired
    private UserService userService;

//    @GetMapping("/login")
//    private User getCurrentUser(@RequestBody User user) {
//        System.out.println("Controller GET *****");
//        System.out.println(userService.getUser(user));
//        return userService.getUser(user);
//    }

    @GetMapping("/login")
    private User getCurrentUser(@RequestBody User user) {
        System.out.println("GET User by userName and password *****");
        //System.out.println(userService.getUser(user));
        return userService.getUser(user);
    }

    @GetMapping("/login/{userName}/{password}")
    private boolean findUserByUserName(@PathVariable String userName, @PathVariable String password) {
        System.out.println("GET User by userName and password *****");
        //System.out.println(userService.getUserByUserName(userName, password));
        return userService.getUserByUserName(userName, password);
    }

    @PostMapping("/createUser")
    private boolean addUser(@RequestBody User user) {
        boolean user_exits = userService.findUserByUserName(user.getUserName());
        if(user_exits) {
            System.out.println("CANT CREATE USER!");
            return false;
        }
        userService.saveUser(user);
        return true;
    }
}
