package edu.fudan.projectbasedlearning.service;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.pojo.Student;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * created by 姜向阳
 * on 2020/5/29
 */
public class ProjectServiceTest extends Tester {

    @Autowired
    private ProjectService projectService;

    @Test
    public void testFindAllProject(){
        List<Project> allProject = projectService.findAll();
        System.out.println("testFindAllProject");
        System.out.println(allProject);
    }
    @Test
    public void testFindStudentList(){
        List<Student> users = projectService.findUserListOfProject(1);
        System.out.println("testFindStudentList");
        System.out.println(users);
        System.out.println(users.get(0).getsId());
        System.out.println(users.get(0).getUser().getUserId());
    }

    @Test
    public void testSelectStudentNumberOfProjectAndOther(){
        System.out.println(projectService.selectStudentNumberOfProjectAndOther());
    }
}
