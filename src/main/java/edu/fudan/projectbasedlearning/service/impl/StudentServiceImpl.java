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

}
