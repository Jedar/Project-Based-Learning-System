package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.pojo.Student;

import java.util.List;


public interface ProjectMapper extends Mapper<Project> {
    //查询一门课程的学生列表
    List<Student> findStudentListOfProject(int projectId);

    //插入评分规则
    void insertScoreDistribute(int projectId, int type, double distribute);

    void insertProject(Project project);
    // 删除项目
    void deleteProject(int projectId);

    //查询某门课程的所有项目
    List<Project> selectAllProjectsOfCourse(int courseId);

    //查询某个学生在某门课程下参与的所有项目
    List<Project> selectAllProjectsOfStudentInCourse(int studentId, int courseId);

    //学生退出项目
    void studentDropProject(int studentId, int projectId);

    //学生加入新项目
    void studentJoinProject(int studentId, int projectId);
}
