package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.CourseMapper;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.CourseService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
@Service
@Transactional
public class CourseServiceImpl extends AbstractService<Course> implements CourseService {
    @Resource
    private CourseMapper courseMapper;
    @Override
    public List<Student> findUserListOfCourse(int courseId) {
        return courseMapper.findStudentListOfCourse(courseId);
    }

    @Override
    public List<HashMap<String, String>> selectAllCourses() {
        return courseMapper.selectAllCourses();
    }

}
