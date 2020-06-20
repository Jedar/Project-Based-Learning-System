package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.HashMap;
import java.util.List;

public interface CourseMapper extends Mapper<Course> {

    //查询选择某门课程的学生的学校信息
    List<HashMap<String,Object>> getStudentSchoolsOfCourse(int courseId);

    //查询选择某门课程的学生的性别信息
    List<HashMap<String,Object>> getStudentGendersOfCourse(int courseId);

    //得到课程信息
    HashMap<String,Object> getCourseInfo(int courseId);

    //返回指定课程的选课学生人数
    int findStudentNumberOfCourse(int courseId);

    //找到指定课程的学生列表
    List<Student> findStudentListOfCourse(int courseId);

    // 查询所有的课程
    List<HashMap<String,Object>> selectAllCourses();

    //找到指定课程的项目列表
    List<Project> findProjectListOfCourse(int courseId);
    //删除课程
    void deleteCourse(int courseId);
    //保存课程
    void insertCourse(Course course);
    //插入teach表中
    void insertTeach(int teacherId, int courseId);

    //查询某个学生已选的所有课程
    List<HashMap<String,Object>> selectStudentCourses(int studentId);

    //根据关键词搜索课程
    List<HashMap<String,Object>> searchCourses(String keyword);

    //学生选课（将数据插入take表）
    void studentChooseCourse(int studentId, int courseId);

    //学生退课（从take表中删除数据）
    void studentDropCourse(int studentId, int courseId);

    //查询某个教师开设的所有课程
    List<Course> selectTeacherCourses(int teacherId);

    //查询课程的选课人数及其他信息
    List<HashMap<String, Object>> selectStudentNumberOfCourse();

    HashMap<String, Object> selectCourseById(int courseId);
}
