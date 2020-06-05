package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.pojo.File;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.FileService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
* Created by CodeGenerator on 2020/05/29.
*/
@RestController
@RequestMapping("/file")
public class FileController {
    @Resource
    private FileService fileService;

    @Autowired
    private User user;

    @PostMapping("/add")
    public Result add(@RequestBody File file) {
        System.out.println(file);
        file.setUserId(user.getUserId());
        file.setTime(new Date());
        if(file.getProjectId() == null || file.getUserId() == null || file.getPath() == null){
            return ResultGenerator.genFailResult("文件信息错误，请重试");
        }
        fileService.addFile(file);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/delete/{fileId}")
    public Result delete(@PathVariable("fileId")Integer fileId) {
        fileService.deleteById(fileId);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/info/{fileId}")
    public Result detail(@PathVariable("fileId")Integer fileId) {
        File file = fileService.findById(fileId);
        return ResultGenerator.genSuccessResult(file);
    }

    @GetMapping("/list")
    public Result list(@RequestParam Integer projectId) {
        List<HashMap<String,Object>> list = fileService.getFileListOf(projectId);
        return ResultGenerator.genSuccessResult(list);
    }
}
