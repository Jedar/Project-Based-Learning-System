package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.service.ProjectService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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

    @DeleteMapping("/deleteProject")
    public Result deleteProject(int projectId){
        if (projectService.findUserListOfProject(projectId).size()==0){//无人选此项目
            projectService.deleteProject(projectId);
            return ResultGenerator.genSuccessResult();
        }else{
            return ResultGenerator.genFailResult("该项目已有人加入，无法删除");
        }

    }

    @PostMapping("/updateProject")
    public Result updateProject(@RequestParam HashMap<String, String> projectInfo){
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

    @PostMapping("/createProject")
    public Result createProject(@RequestParam HashMap<String, String> projectInfo){
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
        double value1 = Integer.parseInt(projectInfo.get("value1"))/100.0;
        double value2 = Integer.parseInt(projectInfo.get("value2"))/100.0;
        double value3 = Integer.parseInt(projectInfo.get("value3"))/100.0;
        project.setCourseId(courseId);
        project.setProjectName(projectInfo.get("projectName"));
        project.setTheme(projectInfo.get("theme"));
        projectService.createProject(project, value1, value2, value3);
        return ResultGenerator.genSuccessResult();
    }
}
