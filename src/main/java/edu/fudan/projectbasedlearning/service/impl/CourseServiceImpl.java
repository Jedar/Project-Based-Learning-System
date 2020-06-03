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
    public List<HashMap<String, Object>> selectStudentCourses(int studentId) {
        return courseMapper.selectStudentCourses(studentId);
    }

    @Override
    public List<HashMap<String, Object>> searchCourses(String keyword) {
        return courseMapper.searchCourses(keyword);
    }

    @Override
    public HashMap<String, Object> studentChooseCourse(int studentId, int courseId) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("message", "");
        List<HashMap<String, Object>> list = selectStudentCourses(studentId);

        for(HashMap<String, Object> course: list){

            int tempCourseId = (int)course.get("course_id");
            if(tempCourseId == courseId){
                result.put("code", 400);
                result.put("message", "你已选过该门课程！");
                return result;
            }
        }

        courseMapper.studentChooseCourse(studentId, courseId);
        return result;
    }

    @Override
    public void studentDropCourse(int studentId, int courseId) {
        courseMapper.studentDropCourse(studentId, courseId);
    }

    @Override
    public List<Course> selectTeacherCourses(int teacherId) {
        return courseMapper.selectTeacherCourses(teacherId);
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
        System.out.println(user);
        System.out.println(course);
        courseMapper.insertTeach(user.getUserId(), course.getCourseId());
    }

    @Override
    public void createCourse(Course course, int teacherId) {
        courseMapper.insertCourse(course);
        courseMapper.insertTeach(teacherId, course.getCourseId());
    }
}
