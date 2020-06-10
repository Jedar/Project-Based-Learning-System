package edu.fudan.projectbasedlearning.controller;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.service.StudentService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
* Created by CodeGenerator on 2020/05/27.
*/
@RestController
@Api(value = "学生管理相关接口",tags = "学生管理相关接口")
@RequestMapping("/student")
public class StudentController {
    @Resource
    private StudentService studentService;

    @ApiOperation(value = "根据项目id查找学生列表")
    @ApiImplicitParam(name = "项目id")
    @GetMapping("/project")
    public Result<List<HashMap<String,Object>>> getStudents(@RequestParam int projectId){
        ResultTypeGenerator<List<HashMap<String, Object>>> generator = new ResultTypeGenerator<>();
        List<HashMap<String,Object>> list = studentService.findStudentFromProject(projectId);
        return generator.genSuccessResult(list);
    }

    @ApiOperation(value = "添加学生")
    @PostMapping("/add")
    public Result add(Student student) {
        studentService.save(student);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "删除学生")
    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        studentService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "更新学生信息")
    @PostMapping("/update")
    public Result update(Student student) {
        studentService.update(student);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "根据id查找学生信息")
    @PostMapping("/detail")
    public Result<Student> detail(@RequestParam Integer id) {
        ResultTypeGenerator<Student> generator = new ResultTypeGenerator<>();
        Student student = studentService.findById(id);
        return generator.genSuccessResult(student);
    }

    @ApiOperation(value = "查找学生列表")
    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Student> list = studentService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
