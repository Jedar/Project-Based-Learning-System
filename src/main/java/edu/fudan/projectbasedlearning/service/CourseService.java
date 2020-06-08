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
    List<HashMap<String,Object>> selectAllCourses();

    //删除课程以及项目
    void deleteCourse(int courseId);

    void createCourse(Course course, String teacherName);

    void createCourse(Course course, int teacherId);

    //查询某个学生已选的所有课程
    List<HashMap<String,Object>> selectStudentCourses(int studentId);

    //根据关键词搜索课程
    List<HashMap<String,Object>> searchCourses(String keyword);

    //学生选课（将数据插入take表）
    HashMap<String, Object> studentChooseCourse(int studentId, int courseId);

    //学生退课（从take表中删除数据）
    void studentDropCourse(int studentId, int courseId);

    //查询某个教师开设的所有课程
    List<Course> selectTeacherCourses(int teacherId);

    //查询课程的选课人数及其他信息
    List<HashMap<String, Object>> selectStudentNumberOfCourseAndOther();
}
