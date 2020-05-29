package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Task;

import java.util.HashMap;
import java.util.List;

public interface TaskMapper extends Mapper<Task> {

    /* 查询项目的所有任务 */
    public List<Task> getTasksByProject(Integer projectId);

    public List<HashMap<String,String>> getTaskInfoByProject(Integer projectId);

    /* 获取某个用户的所有任务列表 */
    public List<Task> getTasksByUser(Integer userId);

    /* 修改任务进度 */
    public void modifyTask(Integer taskId, Integer state, String comment);
}