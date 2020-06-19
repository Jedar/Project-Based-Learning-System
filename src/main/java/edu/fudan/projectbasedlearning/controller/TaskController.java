package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.pojo.Score;
import edu.fudan.projectbasedlearning.pojo.Task;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.request.EditTaskRequest;
import edu.fudan.projectbasedlearning.service.TaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
* Created by CodeGenerator on 2020/05/29.
*/
@RestController
@Api(value = "任务管理相关接口",tags = "任务管理相关接口")
@RequestMapping("/task")
public class TaskController {
    @Resource
    private TaskService taskService;

    @Autowired
    private User user;

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "根据项目id返回所有任务列表")
    @GetMapping("/all")
    public Result<List<HashMap<String,Object>>> getAllTasks(@RequestParam String projectId){
        ResultTypeGenerator<List<HashMap<String,Object>>> generator = new ResultTypeGenerator<>();
        int id;
        try {
            id = Integer.parseInt(projectId);
        }
        catch (Exception e){
            return generator.genFailResult("Get参数错误");
        }
        List<HashMap<String,Object>> list = taskService.getAllTaskListByProject(id);
        System.out.println(list);
        return generator.genSuccessResult(list);
    }

    @UserLoginToken(roles = {"Student","Teacher"})
    @ApiOperation(value = "根据项目id和学生id返回学生任务列表")
    @GetMapping("/user")
    public Result<List<HashMap<String,Object>>> getTasksOfUser(@RequestParam String projectId, @RequestParam String userId){
        ResultTypeGenerator<List<HashMap<String,Object>>> generator = new ResultTypeGenerator<>();
        int project;
        int user;
        try {
            project = Integer.parseInt(projectId);
            user = Integer.parseInt(userId);
        }
        catch (Exception e){
            return generator.genFailResult("Get参数错误");
        }
        List<HashMap<String,Object>> list = taskService.getAllTaskListByUser(user,project);
        return generator.genSuccessResult(list);
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "根据任务id返回任务信息")
    @GetMapping("/info/{taskId}")
    public Result<HashMap<String,Object>> info(@PathVariable("taskId") int taskId ){
        HashMap<String,Object> res = taskService.getTaskInfo(taskId);
        return ResultGenerator.genSuccessResult(res);
    }

    @UserLoginToken(roles = {"Student"})
    @ApiOperation(value = "编辑任务信息")
    @PutMapping("/edit")
    public Result edit(@RequestBody EditTaskRequest request){
        this.taskService.modifyTask(request.getTaskId(),request.getState(),request.getComment());
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "更新任务")
    @PutMapping("/update")
    public Result modify(@RequestBody Task task){
        System.out.println(task);
        this.taskService.update(task);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "新增任务")
    @PostMapping("/add")
    public Result add(@RequestBody Task task) {
        task.setTaskId(null);
        taskService.setTask(task);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "根据任务id删除任务")
    @DeleteMapping("/delete/{taskId}")
    public Result delete(@PathVariable("taskId") Integer taskId) {
        taskService.deleteById(taskId);
        return ResultGenerator.genSuccessResult();
    }
}
