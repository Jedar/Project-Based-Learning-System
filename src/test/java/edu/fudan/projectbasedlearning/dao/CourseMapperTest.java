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
        List<HashMap<String,Object>> list = courseMapper.selectStudentCourses(10009);
        System.out.println(list);
    }

    @Test
    public void searchCourses() {
        List<HashMap<String,Object>> list = courseMapper.searchCourses("");
        System.out.println(list);
    }

    @Test
    public void studentChooseCourse() {
        List<HashMap<String,Object>> list = courseMapper.selectStudentCourses(10009);
        System.out.println(list);
        courseMapper.studentChooseCourse(10009, 6);
        list = courseMapper.selectStudentCourses(10009);
        System.out.println(list);
    }

    @Test
    public void studentDropCourse() {
        List<HashMap<String,Object>> list = courseMapper.selectStudentCourses(10009);
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

    @Test
    public void findStudentNumberOfCourse() {
        System.out.println(courseMapper.findStudentNumberOfCourse(1));
    }

    @Test
    public void getStudentSchoolsOfCourse() {
        System.out.println(courseMapper.getStudentSchoolsOfCourse(1));
    }

    @Test
    public void getStudentGendersOfCourse() {
        System.out.println(courseMapper.getStudentGendersOfCourse(1));
    }
}
