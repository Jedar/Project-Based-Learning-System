package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Project;

import java.util.List;


public interface ProjectMapper extends Mapper<Project> {

    //查询某门课程的所有项目
    public List<Project> selectAllProjectsOfCourse(int courseId);

    //查询某个学生在某门课程下参与的所有项目
    public List<Project> selectAllProjectsOfStudentInCourse(int studentId, int courseId);

    //学生退出项目
    public void studentDropProject(int studentId, int projectId);

    //学生加入新项目
    public void studentJoinProject(int studentId, int projectId);
}

