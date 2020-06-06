package edu.fudan.projectbasedlearning.controller;

import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import edu.fudan.projectbasedlearning.service.DiscussionService;
import edu.fudan.projectbasedlearning.service.UserService;
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
@RequestMapping("/discussion")
public class DiscussionController {
    @Resource
    private DiscussionService discussionService;
    private UserService userService;

    @UserLoginToken(roles = {"Student", "Teacher"})
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
    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        discussionService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @PostMapping("/updateLikes")
    public Result update(@RequestParam HashMap<String, String> hashMap) {
        int id = Integer.parseInt(hashMap.get("discussionId"));
        int likes = Integer.parseInt(hashMap.get("likes"));
        discussionService.updateLikes(id,likes);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Discussion discussion = discussionService.findById(id);
        return ResultGenerator.genSuccessResult(discussion);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @GetMapping("/list/{projectId}")
    public Result list(@PathVariable Integer projectId) {
        List<Discussion> discussionList = discussionService.findFirstDiscussionByProjectId(projectId);
        return ResultGenerator.genSuccessResult(discussionList);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @GetMapping("/children")
    public Result getChildren(@RequestParam Integer projectId, @RequestParam Integer parentsId) {
        List<Discussion> discussionList = discussionService.findAllChildrenOfDiscussion(projectId, parentsId);
        return ResultGenerator.genSuccessResult(discussionList);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @GetMapping("/getDiscussionAuthor/{studentId}")
    public Result getDiscussionAuthor(@PathVariable Integer studentId) {
        HashMap<String, String> studentInfo = discussionService.findAuthorById(studentId);
        return ResultGenerator.genSuccessResult(studentInfo);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @GetMapping("/getAllDiscussions/{projectId}")
    public Result getAllDiscussions(@PathVariable Integer projectId) {
        List<Discussion> discussionList = discussionService.findAllDiscussions(projectId);
        return ResultGenerator.genSuccessResult(discussionList);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @RequestMapping("getPublishCount/{studentId}")
    public Result getPublishCount(@PathVariable Integer studentId){
        int count = discussionService.getPublishCount(studentId);
        return ResultGenerator.genSuccessResult(count);
    }

    @UserLoginToken(roles = {"Student", "Teacher"})
    @RequestMapping("getReplyCount/{studentId}")
    public Result getReplyCount(@PathVariable Integer studentId){
        int count = discussionService.getReplyCount(studentId);
        return ResultGenerator.genSuccessResult(count);
    }
}
