package edu.fudan.projectbasedlearning.service;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;

/**
 * created by 姜向阳
 * on 2020/5/27
 */
public class StudentServiceTest extends Tester {
    @Autowired
    private StudentService studentService;
    @Test
    public void testSaveStudent(){
        User user = new User();
        user.setUsername("jxy123");
        user.setPassword("123456");
        user.setRole(2);
        Student student = new Student();
        student.setsId(10010);
        student.setGender("男");
        student.setSchool("复旦大学");
        student.setUser(user);
        studentService.saveStudent(student);
    }
}
