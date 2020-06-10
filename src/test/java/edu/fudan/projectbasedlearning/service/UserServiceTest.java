package edu.fudan.projectbasedlearning.service;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Student;
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
        User user =  userService.findByUsernameAndPassword("student1", "123456", 2);
        System.out.println(user);
    }
    @Test
    public void testIsUniqueUsername(){
        User user = userService.findBy("username", "11111");
        System.out.println(user);
    }
    @Test
    public void testSaveStudent(){
        User user = new User();
        user.setUsername("jxy123");
        user.setPassword("123456");
        user.setRole(2);
        Student student = new Student();
        student.setGender("男");
        student.setSchool("复旦大学");
        student.setUser(user);
        userService.saveStudent(student);
    }
    @Test
    public void test(){
        System.out.println("男".length());
    }
}
