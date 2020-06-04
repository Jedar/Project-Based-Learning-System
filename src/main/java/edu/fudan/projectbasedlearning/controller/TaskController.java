package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Task;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.request.EditTaskRequest;
import edu.fudan.projectbasedlearning.service.TaskService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/user")
    public Result getTasksOfUser(@RequestParam String projectId, @RequestParam String userId){
        int project;
        int user;
        try {
            project = Integer.parseInt(projectId);
            user = Integer.parseInt(userId);
        }
        catch (Exception e){
            return ResultGenerator.genFailResult("Get参数错误");
        }
        List<HashMap<String,Object>> list = taskService.getAllTaskListByUser(user,project);
        return ResultGenerator.genSuccessResult(list);
    }

    @GetMapping("/info/{taskId}")
    public Result info(@PathVariable("taskId") int taskId ){
        HashMap<String,Object> res = taskService.getTaskInfo(taskId);
        return ResultGenerator.genSuccessResult(res);
    }

    @PutMapping("/edit")
    public Result edit(@RequestBody EditTaskRequest request){
        this.taskService.modifyTask(request.getTaskId(),request.getState(),request.getComment());
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/update")
    public Result modify(@RequestBody Task task){
        this.taskService.update(task);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/add")
    public Result add(@RequestBody Task task) {
        task.setTaskId(null);
        taskService.setTask(task);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/delete")
    public Result delete(@RequestParam Integer taskId) {
        taskService.deleteById(taskId);
        return ResultGenerator.genSuccessResult();
    }
}
