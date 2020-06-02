package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Task;
import edu.fudan.projectbasedlearning.core.Service;

import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
public interface TaskService extends Service<Task> {

    public List<HashMap<String,Object>> getAllTaskListByProject(int projectId);

}
