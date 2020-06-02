package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.CourseMapper;
import edu.fudan.projectbasedlearning.dao.ProjectMapper;
import edu.fudan.projectbasedlearning.dao.UserMapper;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.CourseService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

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
    @Resource
    private ProjectMapper projectMapper;
    @Resource
    private UserMapper userMapper;
    @Override
    public List<Student> findUserListOfCourse(int courseId) {
        return courseMapper.findStudentListOfCourse(courseId);
    }

    @Override
    public List<HashMap<String, Object>> selectAllCourses() {
        return courseMapper.selectAllCourses();
    }

    @Override
    public List<Course> selectTeacherCourses(int teacherId) {
        return courseMapper.selectTeacherCourses(teacherId);
    }

    @Override
    public List<HashMap<String, String>> selectStudentCourses(int studentId) {
        return courseMapper.selectStudentCourses(studentId);
    }

    @Override
    public void deleteCourse(int courseId) {
        List<Project> projectList = courseMapper.findProjectListOfCourse(courseId);
        for (Project project : projectList){
            projectMapper.deleteProject(project.getProjectId());
        }
        courseMapper.deleteCourse(courseId);
    }

    @Override
    public void createCourse(Course course, String teacherName) {
        courseMapper.insertCourse(course);
        User teacher = new User();
        teacher.setUsername(teacherName);
        User user = userMapper.selectOne(teacher);
        courseMapper.insertTeach(user.getUserId(), course.getCourseId());
    }


}
