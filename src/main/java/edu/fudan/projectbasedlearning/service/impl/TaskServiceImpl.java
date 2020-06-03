package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.TaskMapper;
import edu.fudan.projectbasedlearning.pojo.Task;
import edu.fudan.projectbasedlearning.service.TaskService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
@Service
@Transactional
public class TaskServiceImpl extends AbstractService<Task> implements TaskService {
    @Resource
    private TaskMapper taskMapper;

    @Override
    public List<HashMap<String, Object>> getAllTaskListByProject(int projectId) {
        return taskMapper.getTaskInfoByProject(projectId);
    }

    @Override
    public List<HashMap<String, Object>> getAllTaskListByUser(int userId, int projectId) {
        return taskMapper.getTasksByUser(userId,projectId);
    }

    @Override
    public HashMap<String, Object> getTaskInfo(int taskId) {
        return taskMapper.getTaskInfo(taskId);
    }

    @Override
    public void modifyTask(int taskId, int state, String comment) {
        taskMapper.modifyTask(taskId,state,comment);
    }

    @Override
    public void setTask(Task task) {
        taskMapper.insert(task);
    }
}
