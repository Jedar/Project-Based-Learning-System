package edu.fudan.projectbasedlearning.controller;
import com.alibaba.fastjson.JSONObject;
import edu.fudan.projectbasedlearning.annotation.PassToken;
import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.service.ProjectService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import javax.swing.text.DateFormatter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
* Created by CodeGenerator on 2020/05/28.
*/
@RestController
@RequestMapping("/project")
public class ProjectController {
    @Resource
    private ProjectService projectService;

    @UserLoginToken(roles = {"Manager"})
    @GetMapping("/projectChart")
    public Result getProjectChart(){
        List<HashMap<String, Object>> mapList = projectService.selectStudentNumberOfProjectAndOther();
        return ResultGenerator.genSuccessResult(mapList);
    }

    @UserLoginToken(roles = {"Manager"})
    @GetMapping("/projectList")
    public Result getProjectList(){
        List<Project> projectList = projectService.findAll();
        List<HashMap<String, Object>> projectMaps = new ArrayList<>();
        for (Project project : projectList){
            HashMap<String, Object> projectMap = new HashMap<>();
            projectMap.put("projectId", project.getProjectId());
            projectMap.put("projectName", project.getProjectName());
            projectMap.put("theme",project.getTheme());
            projectMap.put("leaderId", project.getLeaderId()+"");
            projectMap.put("description",project.getDescription());
            projectMap.put("courseId", project.getCourseId()+"");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
            String startTime = sdf.format(project.getStartTime());
            String endTime = sdf.format(project.getEndTime());
            projectMap.put("startTime", startTime);
            projectMap.put("endTime", endTime);
            projectMaps.add(projectMap);
        }
        return ResultGenerator.genSuccessResult(projectMaps);
    }

    @UserLoginToken(roles = {"Teacher", "Manager"})
    @DeleteMapping("/deleteProject")
    public Result deleteProject(@RequestParam("projectId") Integer projectId) {
        if (projectService.findUserListOfProject(projectId).size() == 0) {//无人选此项目
            projectService.deleteProject(projectId);
            return ResultGenerator.genSuccessResult();
        } else {
            return ResultGenerator.genFailResult("该项目已有人加入，无法删除");
        }
    }

    @UserLoginToken(roles = {"Manager"})
    @PostMapping("/updateProject")
    public Result updateProject(@RequestParam HashMap<String, String> projectInfo) {
        Project project = new Project();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        int projectId = Integer.parseInt(projectInfo.get("projectId"));
        int courseId = Integer.parseInt(projectInfo.get("courseId"));
        Date startTime, endTime;
        try {
            startTime = format.parse(projectInfo.get("startTime"));
            endTime = format.parse(projectInfo.get("endTime"));
            project.setStartTime(startTime);
            project.setEndTime(endTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        project.setProjectId(projectId);
        project.setCourseId(courseId);
        project.setProjectName(projectInfo.get("projectName"));
        project.setTheme(projectInfo.get("theme"));
        projectService.update(project);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Teacher", "Manager"})
    @PostMapping("/createProject")
    public Result createProject(@RequestParam HashMap<String, String> projectInfo) {
        Project project = new Project();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        int courseId = Integer.parseInt(projectInfo.get("courseId"));
        Date startTime, endTime;
        try {
            startTime = format.parse(projectInfo.get("startTime"));
            endTime = format.parse(projectInfo.get("endTime"));
            project.setStartTime(startTime);
            project.setEndTime(endTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        double value1 = Integer.parseInt(projectInfo.get("value1")) / 100.0;
        double value2 = Integer.parseInt(projectInfo.get("value2")) / 100.0;
        double value3 = Integer.parseInt(projectInfo.get("value3")) / 100.0;
        project.setCourseId(courseId);
        project.setProjectName(projectInfo.get("projectName"));
        project.setTheme(projectInfo.get("theme"));
        projectService.createProject(project, value1, value2, value3);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student"})
    @GetMapping("/getAllStudentProjects")
    public Result getAllStudentProjects(@RequestParam("studentId") Integer studentId, @RequestParam("courseId") Integer courseId){
        List<Project> list = projectService.selectAllProjectsOfStudentInCourse(studentId, courseId);

        List<HashMap<String, Object>> projectMaps = new ArrayList<>();

        for (Project project : list){
            HashMap<String, Object> projectMap = new HashMap<>();
            projectMap.put("projectId", project.getProjectId());
            projectMap.put("projectName", project.getProjectName());
            projectMap.put("theme",project.getTheme());
            projectMap.put("leaderId", project.getLeaderId()+"");
            projectMap.put("description",project.getDescription());
            projectMap.put("courseId", project.getCourseId()+"");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
            String startTime = sdf.format(project.getStartTime());
            String endTime = sdf.format(project.getEndTime());
            projectMap.put("startTime", startTime);
            projectMap.put("endTime", endTime);
            projectMaps.add(projectMap);
        }
        return ResultGenerator.genSuccessResult(projectMaps);
    }

    @DeleteMapping("/studentDropProject")
    @UserLoginToken(roles = {"Student"})
    public Result studentDropProject(@RequestParam("studentId") Integer studentId, @RequestParam("projectId") Integer projectId) {
        projectService.studentDropProject(studentId, projectId);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @GetMapping("/getAllCourseProjects")
    public Result getAllCourseProjects(@RequestParam("courseId") Integer courseId){

        List<Project> list = projectService.selectAllProjectsOfCourse(courseId);

        List<HashMap<String, Object>> projectMaps = new ArrayList<>();

        for (Project project : list){

            HashMap<String, Object> projectMap = new HashMap<>();
            projectMap.put("projectId", project.getProjectId());
            projectMap.put("projectName", project.getProjectName());
            projectMap.put("theme",project.getTheme());
            projectMap.put("leaderId", project.getLeaderId()+"");
            projectMap.put("description",project.getDescription());
            projectMap.put("courseId", project.getCourseId()+"");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
            String startTime = sdf.format(project.getStartTime());
            String endTime = sdf.format(project.getEndTime());
            projectMap.put("startTime", startTime);
            projectMap.put("endTime", endTime);
            projectMaps.add(projectMap);
        }
        return ResultGenerator.genSuccessResult(projectMaps);
    }

    @PostMapping("/studentJoinProject")
    @UserLoginToken(roles = {"Student"})
    public Result studentJoinProject(@RequestBody JSONObject jsonObject){
        int studentId = (int)jsonObject.get("studentId");
        int projectId = (int)jsonObject.get("projectId");

        HashMap<String, Object> result = projectService.studentJoinProject(studentId, projectId);
        int code = (int)result.get("code");
        String message = result.get("message") + "";
        if(code == 200)
            return ResultGenerator.genSuccessResult();
        else
            return ResultGenerator.genFailResult(message);
    }

    @GetMapping("/info/{projectId}")
    @UserLoginToken(roles = {"Student", "Teacher"})
    public Result getProjectInfoOf(@PathVariable("projectId") Integer projectId){
        Project project = projectService.findById(projectId);
        return ResultGenerator.genSuccessResult(project);
    }

}
