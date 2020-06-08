package edu.fudan.projectbasedlearning.service;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.pojo.Student;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;

/**
 * created by 姜向阳
 * on 2020/5/29
 */
public class CourseServiceTest extends Tester {

    @Autowired
    private CourseService courseService;
    @Test
    public void testFindAllCourse(){
        List<HashMap<String, Object>> allCourse = courseService.selectAllCourses();
        System.out.println("testFindAllCourse");
        System.out.println(allCourse);
    }
    @Test
    public void testFindStudentList(){
        List<Student> users = courseService.findUserListOfCourse(1);
        System.out.println("testFindStudentList");
        System.out.println(users);

    }
    @Test
    public void testDeleteById(){
        courseService.deleteById(4);
        System.out.println("testDeleteById");
    }
    @Test
    public void testUpdate(){
        Course course = new Course();
        course.setCourseId(4);
        course.setCourseName("11");
        course.setDescription("22");
        course.setMaxStudentNumber(1);
        courseService.update(course);
        System.out.println("testUpdate");
    }
    @Test
    public void testInsert(){
        Course course = new Course();
        course.setCourseName("11111");
        course.setDescription("22222");
        course.setMaxStudentNumber(111);
        course.setPicture("a/a.jpeg");
        courseService.save(course);
        System.out.println("testInsert");
    }

    @Test
    public void testSelectStudentNumberOfCourseAndOther(){
        System.out.println(courseService.selectStudentNumberOfCourseAndOther());
    }
}
