package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Project;
import org.junit.Test;

import javax.annotation.Resource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ProjectMapperTest  extends Tester {

    @Resource
    private ProjectMapper projectMapper;

    @Test
    public void selectAllProjectsOfCourse() {
        List<Project> list = projectMapper.selectAllProjectsOfCourse(1);
        for(Project project: list)
            System.out.println(project.getProjectId() + project.getProjectName());
    }

    @Test
    public void selectAllProjectsOfStudentInCourse() {
        List<Project> list = projectMapper.selectAllProjectsOfStudentInCourse(10009, 1);
        for(Project project: list)
            System.out.println(project.getProjectId() + project.getProjectName());
    }

    @Test
    public void studentDropProject() {
        List<Project> list = projectMapper.selectAllProjectsOfStudentInCourse(10009, 1);
        for(Project project: list)
            System.out.println(project.getProjectId() + project.getProjectName());

        projectMapper.studentDropProject(10009, 1);

        list = projectMapper.selectAllProjectsOfStudentInCourse(10009, 1);
        for(Project project: list)
            System.out.println(project.getProjectId() + project.getProjectName());
    }

    @Test
    public void studentJoinProject() {
        List<Project> list = projectMapper.selectAllProjectsOfStudentInCourse(10009, 1);
        for(Project project: list)
            System.out.println(project.getProjectId() + project.getProjectName());

        projectMapper.studentJoinProject(10009, 2);

        list = projectMapper.selectAllProjectsOfStudentInCourse(10009, 1);
        for(Project project: list)
            System.out.println(project.getProjectId() + project.getProjectName());
    }
}
