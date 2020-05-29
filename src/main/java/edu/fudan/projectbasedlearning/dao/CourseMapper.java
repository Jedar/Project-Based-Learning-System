package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Course;

import java.util.HashMap;
import java.util.List;

public interface CourseMapper extends Mapper<Course> {

    //查询某个学生已选的所有课程
    public List<HashMap<String,String>> selectStudentCourses(int studentId);

    //根据关键词搜索课程
    public List<HashMap<String,String>> searchCourses(String keyword);

    //学生选课（将数据插入take表）
    public void studentChooseCourse(int studentId, int courseId);

    //学生退课（从take表中删除数据）
    public void studentDropCourse(int studentId, int courseId);

    //查询某个教师开设的所有课程
    public List<Course> selectTeacherCourses(int teacherId);


}
