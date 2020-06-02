package edu.fudan.projectbasedlearning.controller;
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
    @GetMapping("/courseList")
    public Result getCourseList(){
        List<HashMap<String, Object>> courseList = courseService.selectAllCourses();
        return ResultGenerator.genSuccessResult(courseList);
    }
    @DeleteMapping("/deleteCourse")
    public Result deleteCourse(int courseId){
        if (courseService.findUserListOfCourse(courseId).size()==0){//没人选课
            courseService.deleteCourse(courseId);
            return ResultGenerator.genSuccessResult();
        }else{//有人选课
            return ResultGenerator.genFailResult("该课程已有人选课，无法删除");
        }

    }

    @PostMapping("/updateCourse")
    public Result updateCourse(@RequestParam HashMap<String, String> courseInfo){
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
    public Result createCourse(@RequestParam HashMap<String, String> courseInfo){
        Course course = new Course();
        int maxStudentNumber = Integer.parseInt(courseInfo.get("maxStudentNumber"));
        course.setMaxStudentNumber(maxStudentNumber);
        course.setCourseName(courseInfo.get("courseName"));
        course.setDescription(courseInfo.get("description"));
        course.setPicture(courseInfo.get("picture"));
        String teacherName = courseInfo.get("teacherName");
        courseService.createCourse(course, teacherName);
        return ResultGenerator.genSuccessResult();
    }
}
