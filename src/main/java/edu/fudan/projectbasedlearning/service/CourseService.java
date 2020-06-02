package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.core.Service;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
public interface CourseService extends Service<Course> {
    List<Student> findUserListOfCourse(int courseId);
    // 查询所有的课程
    List<HashMap<String,String>> selectAllCourses();
}
