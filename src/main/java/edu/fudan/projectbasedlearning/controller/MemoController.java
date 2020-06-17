package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.pojo.Memo;
import edu.fudan.projectbasedlearning.pojo.MemoMessage;
import edu.fudan.projectbasedlearning.pojo.Task;
import edu.fudan.projectbasedlearning.service.MemoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import edu.fudan.projectbasedlearning.service.TaskService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by CodeGenerator on 2020/06/16.
*/
@RestController
@RequestMapping("/memo")
public class MemoController {
    @Resource
    private MemoService memoService;

    @Resource
    private TaskService taskService;

    @UserLoginToken(roles = {"Student","Teacher"})
    @PostMapping("/add")
    public Result add(@RequestBody  Memo memo) {
        Task task = taskService.findById(memo.getTaskId());
        memo.setRead(0);
        memo.setRecvId(task.getUserId());
        memoService.save(memo);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student"})
    @DeleteMapping("/{memo}")
    public Result delete(@PathVariable("memo") Integer id) {
        memoService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student"})
    @GetMapping("/list/{user}")
    public Result<List<MemoMessage>> list(@PathVariable("user") Integer user) {
        List<MemoMessage> list = memoService.findByUser(user);
        return new ResultTypeGenerator<List<MemoMessage>>().genSuccessResult(list);
    }

    @UserLoginToken(roles = {"Student"})
    @GetMapping("/count/{user}")
    public Result<Integer> count(@PathVariable("user") Integer user) {
        int count = memoService.getActiveCount(user);
        return new ResultTypeGenerator<Integer>().genSuccessResult(count);
    }

    @UserLoginToken(roles = {"Student"})
    @PutMapping("/read/{memo}")
    public Result<Integer> read(@PathVariable("memo") Integer memoId) {
        Memo memo = memoService.findById(memoId);
        memo.setRead(1);
        memoService.update(memo);
        return new ResultTypeGenerator<Integer>().genSuccessResult();
    }
}
