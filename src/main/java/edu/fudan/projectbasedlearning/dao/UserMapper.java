package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.User;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;


public interface UserMapper extends Mapper<User> {

    User findByUserNameAndPassword(User user);

    int insertUser(User user);

    //得到学生
    public HashMap<String, String> getStudent(int studentId);

    //得到老师
    public HashMap<String,String> getTeacher(int teacherId);

    //学生查看个人信息
    public HashMap<String, String> getStudentInfo(int studentId);

    //学生修改个人信息
    public void modifyStudentInfo(HashMap<String, Object> param);

    //教师查看个人信息
    public HashMap<String, String> getTeacherInfo(int teacherId);

    //教师修改个人信息
    public void modifyTeacherInfo(HashMap<String, Object> param);
}

