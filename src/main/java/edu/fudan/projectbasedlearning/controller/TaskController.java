package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.pojo.Task;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.request.EditTaskRequest;
import edu.fudan.projectbasedlearning.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
* Created by CodeGenerator on 2020/05/29.
*/
@RestController
@RequestMapping("/task")
public class TaskController {
    @Resource
    private TaskService taskService;

    @Autowired
    private User user;

    @UserLoginToken(roles = {"Teacher","Student"})
    @GetMapping("/all")
    public Result getAllTasks(@RequestParam String projectId){
        int id;
        try {
            id = Integer.parseInt(projectId);
        }
        catch (Exception e){
            return ResultGenerator.genFailResult("Get参数错误");
        }
        List<HashMap<String,Object>> list = taskService.getAllTaskListByProject(id);
        return ResultGenerator.genSuccessResult(list);
    }

    @UserLoginToken(roles = {"Student"})
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
    @GetMapping("/info/{taskId}")
    public Result<HashMap<String,Object>> info(@PathVariable("taskId") int taskId ){
        HashMap<String,Object> res = taskService.getTaskInfo(taskId);
        return ResultGenerator.genSuccessResult(res);
    }

    @UserLoginToken(roles = {"Student"})
    @PutMapping("/edit")
    public Result edit(@RequestBody EditTaskRequest request){
        this.taskService.modifyTask(request.getTaskId(),request.getState(),request.getComment());
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @PutMapping("/update")
    public Result modify(@RequestBody Task task){
        this.taskService.update(task);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @PostMapping("/add")
    public Result add(@RequestBody Task task) {
        task.setTaskId(null);
        taskService.setTask(task);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @DeleteMapping("/delete/{taskId}")
    public Result delete(@PathVariable("taskId") Integer taskId) {
        taskService.deleteById(taskId);
        return ResultGenerator.genSuccessResult();
    }
}
