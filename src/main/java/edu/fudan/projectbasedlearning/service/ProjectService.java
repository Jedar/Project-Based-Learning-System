package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Project;
import edu.fudan.projectbasedlearning.core.Service;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/28.
 */
public interface ProjectService extends Service<Project> {
    List<Student> findUserListOfProject(int projectId);

    /**
     *
     * @param projectId
     * @param value1 自评得分
     * @param value2 互评得分
     * @param value3 老师评分
     * @return
     */
    int saveScoreDistribute(int projectId, double value1, double value2, double value3);
}
