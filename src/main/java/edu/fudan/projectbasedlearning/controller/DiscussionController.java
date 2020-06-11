package edu.fudan.projectbasedlearning.controller;

import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.service.DiscussionService;
import edu.fudan.projectbasedlearning.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Created by CodeGenerator on 2020/05/28.
 */
@RestController
@Api(value = "讨论管理相关接口",tags = "讨论管理相关接口")
@RequestMapping("/discussion")
public class DiscussionController {
    @Resource
    private DiscussionService discussionService;
    private UserService userService;

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "新增讨论")
    @PostMapping("/add")
    public Result add(@RequestParam HashMap<String, String> hashMap) {
        Discussion discussion = new Discussion();
        if (hashMap.containsKey("parentsId")) {
            discussion.setParentsId(Integer.parseInt(hashMap.get("parentsId")));
        }
        discussion.setUserId(Integer.parseInt(hashMap.get("userId")));

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();

        discussion.setTime(date);
        discussion.setProjectId(Integer.parseInt(hashMap.get("projectId")));
        discussion.setLikes(Integer.parseInt(hashMap.get("likes")));
        discussion.setContent(hashMap.get("content"));
        discussionService.save(discussion);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student"})
    @ApiOperation(value = "根据id删除讨论")
    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        discussionService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "更新讨论")
    @PostMapping("/updateLikes")
    public Result update(@RequestParam HashMap<String, String> hashMap) {
        int id = Integer.parseInt(hashMap.get("discussionId"));
        int likes = Integer.parseInt(hashMap.get("likes"));
        discussionService.updateLikes(id,likes);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "根据id查找讨论")
    @ApiImplicitParam(name = "id" ,value = "讨论id")
    @PostMapping("/detail")
    public Result<Discussion> detail(@RequestParam Integer id) {
        ResultTypeGenerator<Discussion> generator = new ResultTypeGenerator<>();
        Discussion discussion = discussionService.findById(id);
        return generator.genSuccessResult(discussion);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "查找一级讨论列表")
    @GetMapping("/list/{projectId}")
    public Result<List<Discussion>> list(@PathVariable Integer projectId) {
        ResultTypeGenerator<List<Discussion>> generator = new ResultTypeGenerator<>();
        List<Discussion> discussionList = discussionService.findFirstDiscussionByProjectId(projectId);
        return generator.genSuccessResult(discussionList);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "查找子讨论列表")
    @GetMapping("/children")
    public Result<List<Discussion>> getChildren(@RequestParam Integer projectId, @RequestParam Integer parentsId) {
        ResultTypeGenerator<List<Discussion>> generator = new ResultTypeGenerator<>();
        List<Discussion> discussionList = discussionService.findAllChildrenOfDiscussion(projectId, parentsId);
        return generator.genSuccessResult(discussionList);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "查找讨论作者列表")
    @GetMapping("/getDiscussionAuthor/{studentId}")
    public Result<HashMap<String, String>> getDiscussionAuthor(@PathVariable Integer studentId) {
        ResultTypeGenerator<HashMap<String, String>> generator = new ResultTypeGenerator<>();
        HashMap<String, String> studentInfo = discussionService.findAuthorById(studentId);
        return generator.genSuccessResult(studentInfo);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "查找所有讨论列表")
    @GetMapping("/getAllDiscussions/{projectId}")
    public Result<List<Discussion>> getAllDiscussions(@PathVariable Integer projectId) {
        ResultTypeGenerator<List<Discussion>> generator = new ResultTypeGenerator<>();
        List<Discussion> discussionList = discussionService.findAllDiscussions(projectId);
        return generator.genSuccessResult(discussionList);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "查找学生发布讨论数")
    @GetMapping("getPublishCount/{studentId}")
    public Result<Integer> getPublishCount(@PathVariable Integer studentId){
        ResultTypeGenerator<Integer> generator = new ResultTypeGenerator<>();
        int count = discussionService.getPublishCount(studentId);
        return generator.genSuccessResult(count);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @ApiOperation(value = "查找学生回复讨论数")
    @GetMapping("getReplyCount/{studentId}")
    public Result<Integer> getReplyCount(@PathVariable Integer studentId){
        ResultTypeGenerator<Integer> generator = new ResultTypeGenerator<>();
        int count = discussionService.getReplyCount(studentId);
        return generator.genSuccessResult(count);
    }
}
