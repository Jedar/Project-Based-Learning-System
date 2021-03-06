package edu.fudan.projectbasedlearning.controller;

import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.pojo.Score;
import edu.fudan.projectbasedlearning.service.ScoreService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Created by CodeGenerator on 2020/05/29.
 */
@RestController
@Api(value = "评分管理相关接口",tags = "评分管理相关接口")
@RequestMapping("/score")
public class ScoreController {
    @Resource
    private ScoreService scoreService;

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "新增分数")
    @PostMapping("/add")
    public Result add(@RequestParam HashMap<String, String> hashMap) {
        Score score = new Score();
        score.setValue(Integer.parseInt(hashMap.get("value")));
        score.setUserId(Integer.parseInt(hashMap.get("userId")));
        score.setTime(new Date());
        score.setScoreType(Integer.parseInt(hashMap.get("scoreType")));
        score.setScorerId(Integer.parseInt(hashMap.get("scorerId")));
        score.setProjectId(Integer.parseInt(hashMap.get("projectId")));
        score.setComment(hashMap.get("comment"));
        scoreService.saveScore(score);
//        System.out.println(ResultGenerator.genSuccessResult());
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "根据id删除分数")
    @ApiImplicitParam(name = "分数id")
    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        scoreService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "更新分数")
    @ApiImplicitParam(name = "分数")
    @PostMapping("/update")
    public Result update(Score score) {
        scoreService.update(score);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "根据id查找分数")
    @ApiImplicitParam(name = "分数id")
    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Score score = scoreService.findById(id);
        return ResultGenerator.genSuccessResult(score);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "根据id查找学生分数列表")
    @GetMapping("/getScores")
    public Result<List<Score>> getScores(@RequestParam Integer studentId,@RequestParam Integer projectId) {
        ResultTypeGenerator<List<Score>> generator = new ResultTypeGenerator<>();
        List<Score> scores = scoreService.findScoresByStudentId(studentId,projectId);
        return generator.genSuccessResult(scores);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "查找所有学生分数列表")
    @GetMapping("/getAllScores")
    public Result<List<Score>> getAllScores(@RequestParam Integer projectId) {
        ResultTypeGenerator<List<Score>> generator = new ResultTypeGenerator<>();
        List<Score> scores = scoreService.findAllScores(projectId);
        return generator.genSuccessResult(scores);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "查找所有学生分数列表")
    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Score> list = scoreService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
