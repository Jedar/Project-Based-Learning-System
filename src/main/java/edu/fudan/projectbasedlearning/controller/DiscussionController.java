package edu.fudan.projectbasedlearning.controller;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.service.DiscussionService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import edu.fudan.projectbasedlearning.service.StudentService;
import edu.fudan.projectbasedlearning.service.UserService;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* Created by CodeGenerator on 2020/05/28.
*/
@RestController
@RequestMapping("/discussion")
public class DiscussionController {
    @Resource
    private DiscussionService discussionService;
    private UserService userService;

    @PostMapping("/add")
    public Result add(@RequestParam HashMap<String,String> hashMap) {
           Discussion discussion = new Discussion();
           if(hashMap.containsKey("parentsId")){
               discussion.setParentsId(Integer.parseInt(hashMap.get("parentsId")));
           }
           discussion.setUserId(Integer.parseInt(hashMap.get("userId")));

           discussion.setTime(new Date());
           discussion.setProjectId(Integer.parseInt(hashMap.get("projectId")));
           discussion.setLikes(Integer.parseInt(hashMap.get("likes")));
           discussion.setContent(hashMap.get("content"));
        discussionService.save(discussion);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        discussionService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Discussion discussion) {
        discussionService.update(discussion);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Discussion discussion = discussionService.findById(id);
        return ResultGenerator.genSuccessResult(discussion);
    }

    @GetMapping("/list")
    public Result list(@RequestParam Integer projectId){
//        projectId = 1;
       List<Discussion> discussionList = discussionService.findAllDiscussionByProjectId(projectId);
       return ResultGenerator.genSuccessResult(discussionList);
    }

    @GetMapping("/children")
    public Result getChildren(@RequestParam Integer projectId,@RequestParam Integer parentsId){
        List<Discussion> discussionList = discussionService.findAllChildrenOfDiscussion(projectId,parentsId);
        return ResultGenerator.genSuccessResult(discussionList);
    }

    @GetMapping("/getDiscussionAuthor")
    public Result getDiscussionAuthor(@RequestParam Integer studentId){
        HashMap<String,String> studentInfo = discussionService.findAuthorById(studentId);
        return ResultGenerator.genSuccessResult(studentInfo);
    }
//    @PostMapping("/list")
//    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
//        PageHelper.startPage(page, size);
//        List<Discussion> list = discussionService.findAll();
//        PageInfo pageInfo = new PageInfo(list);
//        return ResultGenerator.genSuccessResult(pageInfo);
//    }
}
