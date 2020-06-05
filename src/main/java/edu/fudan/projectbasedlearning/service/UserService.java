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

    User findByUsernameAndPassword(String username, String password, int role);

    int saveStudent(Student student);

    int saveTeacher(Teacher teacher);

    void deleteTeacher(int teacherId);

    void deleteStudent(int studentId);

    void managerUpdateStudentInfo(HashMap<String, String> studentInfo);

    void managerUpdateTeacherInfo(HashMap<String, String> studentInfo);

    List<HashMap<String, Object>> getStudentList();

    List<HashMap<String, Object>> getTeacherList();
}
