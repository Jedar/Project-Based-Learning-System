package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Student;

import java.util.HashMap;
import java.util.List;

public interface StudentMapper extends Mapper<Student> {

    List<HashMap<String,Object>> findStudentFromProject(Integer projectId);
}
