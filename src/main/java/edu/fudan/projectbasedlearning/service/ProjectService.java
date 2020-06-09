package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.core.Service;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/28.
 */
public interface ProjectService extends Service<Project> {
    List<Student> findUserListOfProject(int projectId);

    /**
     *
     * @param projectId 项目id
     * @param value1 自评得分
     * @param value2 互评得分
     * @param value3 老师评分
     * @return
     */
    int saveScoreDistribute(int projectId, double value1, double value2, double value3);

    // 删除项目
    void deleteProject(int projectId);

    //查询某门课程的所有项目
    List<Project> selectAllProjectsOfCourse(int courseId);

    //查询某个学生在某门课程下参与的所有项目
    List<Project> selectAllProjectsOfStudentInCourse(int studentId, int courseId);

    //学生退出项目
    void studentDropProject(int studentId, int projectId);

    //学生加入新项目
    HashMap<String, Object> studentJoinProject(int studentId, int projectId);


    void createProject(Project project, double value1, double value2, double value3);

    List<HashMap<String, Object>> selectStudentNumberOfProjectAndOther();
}
