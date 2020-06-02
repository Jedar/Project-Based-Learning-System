package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.ProjectMapper;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.ProjectService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
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
    public void deleteProject(int projectId) {
        projectMapper.deleteProject(projectId);
    }

    @Override
    public void createProject(Project project, double value1, double value2, double value3) {
        projectMapper.insertProject(project);
        saveScoreDistribute(project.getProjectId(), value1, value2, value3);
    }
}
