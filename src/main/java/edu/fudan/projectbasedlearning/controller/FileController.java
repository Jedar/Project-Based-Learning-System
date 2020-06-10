package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.pojo.File;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.FileService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(value = "文件管理相关接口",tags = "文件管理相关接口")
@RequestMapping("/file")
public class FileController {
    @Resource
    private FileService fileService;

    @Autowired
    private User user;

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "上传文件")
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

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "根据文件id删除文件")
    @DeleteMapping("/delete/{fileId}")
    public Result delete(@PathVariable("fileId")Integer fileId) {
        fileService.deleteById(fileId);
        return ResultGenerator.genSuccessResult();
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "根据文件id查找文件")
    @GetMapping("/info/{fileId}")
    public Result<File> detail(@PathVariable("fileId")Integer fileId) {
        ResultTypeGenerator<File> generator = new ResultTypeGenerator<>();
        File file = fileService.findById(fileId);
        return generator.genSuccessResult(file);
    }

    @UserLoginToken(roles = {"Teacher","Student"})
    @ApiOperation(value = "根据项目id返回文件列表")
    @GetMapping("/list")
    public Result<List<HashMap<String,Object>>> list(@RequestParam Integer projectId) {
        ResultTypeGenerator<List<HashMap<String, Object>>> generator = new ResultTypeGenerator<>();
        List<HashMap<String,Object>> list = fileService.getFileListOf(projectId);
        return generator.genSuccessResult(list);
    }
}
