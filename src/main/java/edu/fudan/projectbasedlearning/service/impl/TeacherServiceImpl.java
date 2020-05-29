package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.TeacherMapper;
import edu.fudan.projectbasedlearning.pojo.Teacher;
import edu.fudan.projectbasedlearning.service.TeacherService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
@Service
@Transactional
public class TeacherServiceImpl extends AbstractService<Teacher> implements TeacherService {
    @Resource
    private TeacherMapper teacherMapper;

}
