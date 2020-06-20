package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.Teacher;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.core.Service;

import java.util.HashMap;
import java.util.List;

import java.util.HashMap;


/**
 * Created by CodeGenerator on 2020/05/26.
 */
public interface UserService extends Service<User> {

    //学生查看个人信息
    HashMap<String, Object> getStudentInfo(int studentId);

    //教师查看个人信息
    HashMap<String, Object> getTeacherInfo(int teacherId);

    //登陆是进行用户名和密码验证
    User findByUsernameAndPassword(String username, String password, int role);

    //保存学生信息
    int saveStudent(Student student);

    //保存教师信息
    int saveTeacher(Teacher teacher);

    //删除教师信息
    void deleteTeacher(int teacherId);

    //删除学生信息
    void deleteStudent(int studentId);

    //更新学生信息
    void managerUpdateStudentInfo(HashMap<String, String> studentInfo);

    //更新教师信息
    void managerUpdateTeacherInfo(HashMap<String, String> studentInfo);

    //获取学生列表
    List<HashMap<String, Object>> getStudentList();

    //获取教师列表
    List<HashMap<String, Object>> getTeacherList();
}
