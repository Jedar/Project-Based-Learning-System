package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.StudentMapper;
import edu.fudan.projectbasedlearning.dao.UserMapper;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.service.StudentService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/27.
 */
@Service
@Transactional
public class StudentServiceImpl extends AbstractService<Student> implements StudentService {
    @Resource
    private StudentMapper studentMapper;
    @Resource
    private UserMapper userMapper;

    /**
     * 同时插入user 和 student
     * @param student
     * @return
     */
    public int saveStudent(Student student){
        int result;
        result = userMapper.insertUser(student.getUser());
        System.out.println(result);
        System.out.println(student.getUser().getUserId());
        result = studentMapper.insertSelective(student);
        System.out.println(result);
        return result;
    }
}
