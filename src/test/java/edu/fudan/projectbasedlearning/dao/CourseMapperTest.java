package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Course;
import org.junit.Test;

import javax.annotation.Resource;

import java.util.HashMap;
import java.util.List;

public class CourseMapperTest extends Tester {

    @Resource
    private CourseMapper courseMapper;

    @Test
    public void selectStudentCourses() {
        List<HashMap<String,String>> list = courseMapper.selectStudentCourses(10009);
        System.out.println(list);
    }

    @Test
    public void searchCourses() {
        List<HashMap<String,String>> list = courseMapper.searchCourses("");
        System.out.println(list);
    }

    @Test
    public void studentChooseCourse() {
        List<HashMap<String,String>> list = courseMapper.selectStudentCourses(10009);
        System.out.println(list);
        courseMapper.studentChooseCourse(10009, 2);
        list = courseMapper.selectStudentCourses(10009);
        System.out.println(list);
    }

    @Test
    public void studentDropCourse() {
        List<HashMap<String,String>> list = courseMapper.selectStudentCourses(10009);
        System.out.println(list);
        courseMapper.studentDropCourse(10009, 1);
        list = courseMapper.selectStudentCourses(10009);
        System.out.println(list);
    }

    @Test
    public void selectTeacherCourses() {
        List<Course> list = courseMapper.selectTeacherCourses(10000);
        for(Course course: list)
            System.out.println(course.getCourseId() + course.getCourseName());
    }
}
