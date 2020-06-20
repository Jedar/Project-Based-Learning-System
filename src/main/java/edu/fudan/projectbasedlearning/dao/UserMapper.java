package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.User;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;
import java.util.List;


public interface UserMapper extends Mapper<User> {

    //登录时进行用户名和密码的判断
    User findByUserNameAndPassword(User user);

    //保存学生信息
    int insertUser(User user);

    //得到学生
    HashMap<String, String> getStudent(int studentId);

    //得到老师
    HashMap<String,String> getTeacher(int teacherId);

    //学生查看个人信息
    HashMap<String, Object> getStudentInfo(int studentId);

    //学生修改个人信息
    void modifyStudentInfo(HashMap<String, Object> param);

    //教师查看个人信息
    HashMap<String, Object> getTeacherInfo(int teacherId);

    //教师修改个人信息
    void modifyTeacherInfo(HashMap<String, Object> param);

    //得到学生列表
    List<HashMap<String, Object>> getStudentList();
    //得到教师列表
    List<HashMap<String, Object>> getTeacherList();

}

