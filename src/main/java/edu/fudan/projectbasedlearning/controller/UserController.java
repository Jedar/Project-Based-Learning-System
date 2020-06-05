package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.annotation.PassToken;
import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.CourseService;
import edu.fudan.projectbasedlearning.service.UserService;
import edu.fudan.projectbasedlearning.utils.JWTTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/**
* Created by CodeGenerator on 2020/05/26.
*/
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private CourseService courseService;

    @PassToken
    @PostMapping("/login")
    public Result login(String username, String password, int role){
        User user = userService.findByUsernameAndPassword(username, password, role);
        if (user==null) {
            return ResultGenerator.genFailResult("用户名或密码错误");
        }
        else{
            String token = JWTTokenUtil.getToken(user);
            return ResultGenerator.genSuccessResult(token, user);
        }
    }
    @PassToken
    @PostMapping("/signup")
    public Result signup(String username, String password, String gender, String school, int role){
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);
        Student student = new Student();
        student.setGender(gender);
        System.out.println(gender);
        student.setSchool(school);
        student.setUser(user);
        System.out.println(student);
        System.out.println(user);
        int result = userService.saveUser(student);
        if (result == 1)
            return ResultGenerator.genSuccessResult();
        else
            return ResultGenerator.genFailResult("注册失败");
    }
    @PassToken
    @GetMapping("/isUniqueUsername/{username}")
    public Result isUniqueUsername(@PathVariable String username){
        User user = userService.findBy("username", username);
        if (user == null)
            return ResultGenerator.genSuccessResult();
        else
            return ResultGenerator.genFailResult("用户名已存在");
    }

    @UserLoginToken(roles = {"Manager"})
    @GetMapping("/teacherList")
    public Result getTeacherList(){
        List<HashMap<String, Object>> teacherList = userService.getTeacherList();
        return ResultGenerator.genSuccessResult(teacherList);
    }

    @UserLoginToken(roles = {"Manager"})
    @GetMapping("/studentList")
    public Result getStudentList(){
        List<HashMap<String, Object>> studentList = userService.getStudentList();
        return ResultGenerator.genSuccessResult(studentList);
    }

    @UserLoginToken(roles = {"Manager"})
    @DeleteMapping("/deleteTeacher")
    public Result deleteTeacher(@RequestParam("teacherId") Integer teacherId){
        if (courseService.selectTeacherCourses(teacherId).size() == 0){//没有开设课程
            userService.deleteTeacher(teacherId);
            return ResultGenerator.genSuccessResult();
        } else{
            return ResultGenerator.genFailResult("该教师已开设课程，不能删除");
        }
    }

    @UserLoginToken(roles = {"Manager"})
    @DeleteMapping("/deleteStudent")
    public Result deleteStudent(@RequestParam("studentId") Integer studentId){

        if (courseService.selectStudentCourses(studentId).size() == 0){//没有选课程
            userService.deleteStudent(studentId);
            return ResultGenerator.genSuccessResult();
        } else{
            return ResultGenerator.genFailResult("该学生已选课，不能删除");
        }
    }


    @GetMapping("/getStudentInfo/{studentId}")
    public Result getStudentInfo(@PathVariable Integer studentId){
        HashMap<String, Object> student = userService.getStudentInfo(studentId);
        return ResultGenerator.genSuccessResult(student);
    }

    @GetMapping("/getTeacherInfo/{teacherId}")
    public Result getTeacherInfo(@PathVariable Integer teacherId){
        HashMap<String, Object> teacher = userService.getTeacherInfo(teacherId);
        return ResultGenerator.genSuccessResult(teacher);
    }


    @PostMapping("/modifyStudentInfo")
    public Result modifyStudentInfo(@RequestParam HashMap<String, String> studentInfo){
        userService.managerUpdateStudentInfo(studentInfo);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/modifyTeacherInfo")
    public Result modifyTeacherInfo(@RequestParam HashMap<String, String> teacherInfo){
        userService.managerUpdateTeacherInfo(teacherInfo);
        return ResultGenerator.genSuccessResult();
    }

}
