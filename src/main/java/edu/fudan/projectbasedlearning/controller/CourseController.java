package edu.fudan.projectbasedlearning.controller;

import com.alibaba.fastjson.JSONObject;
import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.service.CourseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
 * Created by CodeGenerator on 2020/05/29.
 */
@RestController
@RequestMapping("/course")
public class CourseController {
    @Resource
    private CourseService courseService;

    @UserLoginToken(roles = {"Manager"})
    @GetMapping("/courseList")
    public Result getCourseList() {
        List<HashMap<String, Object>> courseList = courseService.selectAllCourses();
        return ResultGenerator.genSuccessResult(courseList);
    }

    @DeleteMapping("/deleteCourse")
    @UserLoginToken(roles = {"Teacher", "Manager"})
    public Result deleteCourse(@RequestParam("courseId") Integer courseId) {
        if (courseService.findUserListOfCourse(courseId).size() == 0) {//没人选课
            courseService.deleteCourse(courseId);
            return ResultGenerator.genSuccessResult();
        } else {//有人选课
            return ResultGenerator.genFailResult("该课程已有人选课，无法删除");
        }

    }

    @UserLoginToken(roles = {"Manager"})
    @PostMapping("/updateCourse")
    public Result updateCourse(@RequestParam HashMap<String, String> courseInfo) {
        Course course = new Course();
        int courseId = Integer.parseInt(courseInfo.get("courseId"));
        int maxStudentNumber = Integer.parseInt(courseInfo.get("maxStudentNumber"));
        course.setCourseId(courseId);
        course.setMaxStudentNumber(maxStudentNumber);
        course.setCourseName(courseInfo.get("courseName"));
        course.setDescription(courseInfo.get("description"));
        courseService.update(course);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/createCourse")
    @UserLoginToken(roles = {"Teacher", "Manager"})
    public Result createCourse(@RequestParam HashMap<String, String> courseInfo) {
        Course course = new Course();
        int maxStudentNumber = Integer.parseInt(courseInfo.get("maxStudentNumber"));
        course.setMaxStudentNumber(maxStudentNumber);
        course.setCourseName(courseInfo.get("courseName"));
        course.setDescription(courseInfo.get("description"));
        course.setPicture(courseInfo.get("picture"));
        if (courseInfo.containsKey("teacherName")) {
            String teacherName = courseInfo.get("teacherName");
            courseService.createCourse(course, teacherName);
        } else if (courseInfo.containsKey("teacherId")) {
            int teacherId = Integer.parseInt(courseInfo.get("teacherId"));
            courseService.createCourse(course, teacherId);
        }
        return ResultGenerator.genSuccessResult();
    }

    //得到某个学生已选的所有课程
    @UserLoginToken(roles = {"Student"})
    @GetMapping("/getStudentCourses/{studentId}")
    public Result getStudentCourses(@PathVariable Integer studentId) {
        List<HashMap<String, Object>> list = courseService.selectStudentCourses(studentId);
        return ResultGenerator.genSuccessResult(list);
    }

    //学生退课
    @UserLoginToken(roles = {"Student"})
    @DeleteMapping("/studentDropCourse")
    public Result studentDropCourse(@RequestParam("studentId") Integer studentId, @RequestParam("courseId") Integer courseId) {
        courseService.studentDropCourse(studentId, courseId);
        return ResultGenerator.genSuccessResult();
    }

    //查询课程
    @GetMapping("/searchCourse")
    @UserLoginToken(roles = {"Student"})
    public Result searchCourse(@RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        List<HashMap<String, Object>> list = courseService.searchCourses(keyword);
        return ResultGenerator.genSuccessResult(list);
    }

    //学生选课
    @PostMapping("/studentJoinCourse")
    @UserLoginToken(roles = {"Student"})
    public Result studentJoinCourse(@RequestBody JSONObject jsonObject) {
        int studentId = (int) jsonObject.get("studentId");
        int courseId = (int) jsonObject.get("courseId");

        HashMap<String, Object> result = courseService.studentChooseCourse(studentId, courseId);
        int code = (int) result.get("code");
        String message = result.get("message") + "";
        if (code == 200)
            return ResultGenerator.genSuccessResult();
        else
            return ResultGenerator.genFailResult(message);
    }

    //得到某个教师开设的所有课程
    @GetMapping("/getTeacherCourses/{teacherId}")
    @UserLoginToken(roles = {"Teacher"})
    public Result getTeacherCourses(@PathVariable Integer teacherId) {
        List<Course> list = courseService.selectTeacherCourses(teacherId);
        return ResultGenerator.genSuccessResult(list);
    }
}
