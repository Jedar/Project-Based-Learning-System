package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Score;
import edu.fudan.projectbasedlearning.service.ScoreService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
* Created by CodeGenerator on 2020/05/29.
*/
@RestController
@RequestMapping("/score")
public class ScoreController {
    @Resource
    private ScoreService scoreService;

    @PostMapping("/add")
    public Result add(@RequestParam HashMap<String,String> hashMap) {
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

    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        scoreService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Score score) {
        scoreService.update(score);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Score score = scoreService.findById(id);
        return ResultGenerator.genSuccessResult(score);
    }

    @GetMapping("/getScores")
    public Result getScores(@RequestParam Integer studentId){
        List<Score> scores = scoreService.findScoresByStudentId(studentId);
        return ResultGenerator.genSuccessResult(scores);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Score> list = scoreService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
