package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.StudentMapper;
import edu.fudan.projectbasedlearning.dao.TeacherMapper;
import edu.fudan.projectbasedlearning.dao.UserMapper;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.Teacher;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.UserService;
import edu.fudan.projectbasedlearning.core.AbstractService;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/26.
 */
@Service
@Transactional
public class UserServiceImpl extends AbstractService<User> implements UserService {

    @Resource
    private StudentMapper studentMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private TeacherMapper teacherMapper;

    /**
     * 同时插入user 和 student
     * @param student
     * @return
     */
    @Override
    public int saveUser(Student student){
        int result;
        result = userMapper.insertUser(student.getUser());
        student.setsId(student.getUser().getUserId());
        result = studentMapper.insertSelective(student);
        return result;
    }

    @Override
    public void deleteTeacher(int teacherId) {
        teacherMapper.deleteByPrimaryKey(teacherId);
        userMapper.deleteByPrimaryKey(teacherId);

    }

    @Override
    public void deleteStudent(int studentId) {
        studentMapper.deleteByPrimaryKey(studentId);
        userMapper.deleteByPrimaryKey(studentId);
    }

    @Override
    public void managerUpdateStudentInfo(HashMap<String, String> studentInfo) {
        System.out.println(studentInfo);
        Student student = new Student();
        int sId = Integer.parseInt(studentInfo.get("sId"));
        String gender = (String) studentInfo.get("gender");
        String school = (String) studentInfo.get("school");
        String username = (String) studentInfo.get("username");
        String password = (String) studentInfo.get("password");
        student.setsId(sId);
        student.setGender(gender);
        student.setSchool(school);
        User user = new User();
        user.setUserId(sId);
        user.setUsername(username);
        user.setPassword(password);
        studentMapper.updateByPrimaryKeySelective(student);
        userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public void managerUpdateTeacherInfo(HashMap<String, String> teacherInfo) {
        Teacher teacher = new Teacher();
        int tId = Integer.parseInt(teacherInfo.get("tId"));
        String gender = (String) teacherInfo.get("gender");
        String school = (String) teacherInfo.get("school");
        String username = (String) teacherInfo.get("username");
        teacher.settId(tId);
        teacher.setGender(gender);
        teacher.setSchool(school);
        User user = new User();
        user.setUserId(tId);
        user.setUsername(username);
        teacherMapper.updateByPrimaryKeySelective(teacher);
        userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public List<HashMap<String, Object>> getStudentList() {
        return userMapper.getStudentList();
    }

    @Override
    public List<HashMap<String, Object>> getTeacherList() {
        return userMapper.getTeacherList();
    }

    @Override
    public User findByUsernameAndPassword(String username, String password, int role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);
        return userMapper.findByUserNameAndPassword(user);
    }

}
