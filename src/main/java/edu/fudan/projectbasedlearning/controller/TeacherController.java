package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.Teacher;
import edu.fudan.projectbasedlearning.service.TeacherService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by CodeGenerator on 2020/05/29.
*/
@RestController
@Api(value = "教师管理相关接口",tags = "教师管理相关接口")
@RequestMapping("/teacher")
public class TeacherController {
    @Resource
    private TeacherService teacherService;

    @ApiOperation(value = "新增教师")
    @PostMapping("/add")
    public Result add(Teacher teacher) {
        teacherService.save(teacher);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "根据教师id删除教师")
    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        teacherService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "更新教师信息")
    @PostMapping("/update")
    public Result update(Teacher teacher) {
        teacherService.update(teacher);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "根据教师id返回教师信息")
    @PostMapping("/detail")
    public Result<Teacher> detail(@RequestParam Integer id) {
        ResultTypeGenerator<Teacher> generator = new ResultTypeGenerator<>();
        Teacher teacher = teacherService.findById(id);
        return generator.genSuccessResult(teacher);
    }

    @ApiOperation(value = "返回教师列表")
    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Teacher> list = teacherService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
