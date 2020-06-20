package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Task;
import edu.fudan.projectbasedlearning.core.Service;

import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
public interface TaskService extends Service<Task> {

    // 获取任务列表
    public List<HashMap<String,Object>> getAllTaskListByProject(int projectId);

    // 根据用户获取任务列表
    public List<HashMap<String, Object>> getAllTaskListByUser(int userId, int projectId);

    // 获取单个任务详细信息
    HashMap<String, Object> getTaskInfo(int taskId);

    // 修改任务
    void modifyTask(int taskId, int state, String comment);

    // 增加任务
    void setTask(Task task);
}
