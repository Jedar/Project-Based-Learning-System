package edu.fudan.projectbasedlearning.service;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * created by 姜向阳
 * on 2020/5/27
 */
public class UserServiceTest extends Tester {
    @Autowired
    private UserService userService;
    @Test
    public void testFindByUserNameAndPassword(){
        User user =  userService.findByUsernameAndPassword("jxy123", "123456");
        System.out.println(user);
    }
}
