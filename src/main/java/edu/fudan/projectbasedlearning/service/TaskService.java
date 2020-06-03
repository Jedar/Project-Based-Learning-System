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

    public List<HashMap<String, Object>> getAllTaskListByUser(int userId, int projectId);

    HashMap<String, Object> getTaskInfo(int taskId);

    void modifyTask(int taskId, int state, String comment);

    void setTask(Task task);
}
