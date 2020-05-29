package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.List;

public interface ProjectMapper extends Mapper<Project> {
    List<Student> findStudentListOfProject(int projectId);
    void insertScoreDistribute(int projectId, int type, double distribute);
}
