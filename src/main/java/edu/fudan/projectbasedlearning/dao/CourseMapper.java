package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.List;

public interface CourseMapper extends Mapper<Course> {
    List<Student> findStudentListOfCourse(int courseId);
}
