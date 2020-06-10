package edu.fudan.projectbasedlearning.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonFormat;
import edu.fudan.projectbasedlearning.dao.ProjectMapper;
import edu.fudan.projectbasedlearning.pojo.Course;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.ProjectService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/28.
 */
@Service
@Transactional
public class ProjectServiceImpl extends AbstractService<Project> implements ProjectService {
    @Resource
    private ProjectMapper projectMapper;

    @Override
    public List<Student> findUserListOfProject(int projectId) {
        return projectMapper.findStudentListOfProject(projectId);
    }

    @Override
    public int saveScoreDistribute(int projectId, double value1, double value2, double value3) {
        try{
            projectMapper.insertScoreDistribute(projectId, 1, value1);
            projectMapper.insertScoreDistribute(projectId, 2, value2);
            projectMapper.insertScoreDistribute(projectId, 3, value3);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
        return 1;
    }

    @Override
    public List<Project> selectAllProjectsOfCourse(int courseId) {
        return projectMapper.selectAllProjectsOfCourse(courseId);
    }

    @Override
    public List<Project> selectAllProjectsOfStudentInCourse(int studentId, int courseId) {
        return projectMapper.selectAllProjectsOfStudentInCourse(studentId, courseId);
    }

    @Override
    public void studentDropProject(int studentId, int projectId) {
        projectMapper.studentDropProject(studentId, projectId);

        Project project = projectMapper.selectByPrimaryKey(projectId);
        //如果该学生是该项目组长，那么把项目组长设为null
        if(project.getLeaderId() == studentId){
            project.setLeaderId(null);
            projectMapper.updateByPrimaryKeySelective(project);
        }
    }

    @Override
    public HashMap<String, Object> studentJoinProject(int studentId, int projectId) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("message", "");

        try {
            projectMapper.studentJoinProject(studentId, projectId);

            Project project = projectMapper.selectByPrimaryKey(projectId);
            //如果该学生是第一个加入该项目的，那么把他设置为组长
            if(project.getLeaderId() == null){
                project.setLeaderId(studentId);
                projectMapper.updateByPrimaryKeySelective(project);
            }
            return result;
        }catch (Exception e){
            result.put("code", 400);
            result.put("message", "你已经加入了该项目！");
            return result;
        }
    }

    @Override
    public void deleteProject(int projectId) {
        projectMapper.deleteProject(projectId);
    }

    @Override
    public void createProject(Project project, double value1, double value2, double value3) {
        projectMapper.insertProject(project);
        saveScoreDistribute(project.getProjectId(), value1, value2, value3);
    }

    @Override
    public List<HashMap<String, Object>> selectStudentNumberOfProjectAndOther() {
        List<HashMap<String, Object>> mapList = projectMapper.selectStudentNumberOfProject();
        List<HashMap<String, Object>> returnMap = new ArrayList<>();
        for (HashMap<String, Object> map : mapList){
            int projectId = (int) (map.get("project_id"));
            Project project = projectMapper.selectByPrimaryKey(projectId);
            HashMap<String, Object> map1 = JSONObject.parseObject(JSONObject.toJSONString(project), HashMap.class);
            map1.put("studentNumberOfProject", map.get("studentNumberOfProject"));
            returnMap.add(map1);
        }
        return returnMap;
    }
}
