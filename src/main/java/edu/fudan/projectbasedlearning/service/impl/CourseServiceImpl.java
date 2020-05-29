package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.CourseMapper;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.service.CourseService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/28.
 */
@Service
@Transactional
public class CourseServiceImpl extends AbstractService<Course> implements CourseService {
    @Resource
    private CourseMapper courseMapper;

}
