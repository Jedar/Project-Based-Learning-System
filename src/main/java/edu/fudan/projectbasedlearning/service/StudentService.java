package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.core.Service;

import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/27.
 */
public interface StudentService extends Service<Student> {

    List<HashMap<String,Object>> findStudentFromProject(Integer projectId);
}
