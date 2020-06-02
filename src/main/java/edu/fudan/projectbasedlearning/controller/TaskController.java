package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Task;
import edu.fudan.projectbasedlearning.pojo.User;
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

    @PostMapping("/add")
    public Result add(Task task) {
        taskService.save(task);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        taskService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Task task) {
        taskService.update(task);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Task task = taskService.findById(id);
        return ResultGenerator.genSuccessResult(task);
    }

    @GetMapping("/list")
    public Result list() {
        List<Task> list = taskService.findAll();
        return ResultGenerator.genSuccessResult(list);
    }
}
