package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Task;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Rollback
@Transactional
public class TaskMapperTest extends Tester {

    @Resource
    private TaskMapper taskMapper;

    @Test
    public void testGetTasksByProject(){
        List<Task> tasks = taskMapper.getTasksByProject(1);

        for(Task task : tasks){
            System.out.println(task);
        }
    }

    @Test
    public void testGetTaskInfoByProject(){
        List<HashMap<String,String>> tasks = taskMapper.getTaskInfoByProject(1);

        for(HashMap<String,String> task : tasks){
            System.out.println(task);
        }
    }

    @Test
    public void testGetTasksByUser(){
        List<Task> tasks = taskMapper.getTasksByUser(10000);

        for(Task task : tasks){
            System.out.println(task);
        }
    }

    @Test
    public void testModifyTask(){
        int id = 1;
        taskMapper.modifyTask(id,10,"提交记录");

        Task task = taskMapper.selectByPrimaryKey(id);

        System.out.println(task);
    }

    @Test
    public void testUpdateTask(){
        int id = 1;
        Task task = taskMapper.selectByPrimaryKey(id);
        System.out.println(task);
        task.setContent("修改测试的内容");
        taskMapper.updateByPrimaryKey(task);
        task = taskMapper.selectByPrimaryKey(id);
        System.out.println(task);
    }

    @Test
    public void testCreate(){
        Task task = new Task();
        task.setTaskName("测试任务");
        task.setContent("测试任务内容");
        task.setStartTime(new Date());
        Date date = new Date();
        date.setTime(new Date().getTime()+3600);
        task.setEndTime(date);
        task.setProjectId(1);
        task.setUserId(10000);
        int key = taskMapper.insertUseGeneratedKeys(task);
        task = taskMapper.selectByPrimaryKey(key);
        System.out.println(task);
    }

    @Test
    public void testDelete(){
        Task task = new Task();
        task.setTaskName("测试任务");
        task.setContent("测试任务内容");
        task.setStartTime(new Date());
        Date date = new Date();
        date.setTime(new Date().getTime()+3600);
        task.setEndTime(date);
        task.setProjectId(1);
        task.setUserId(10000);
        int key = taskMapper.insertUseGeneratedKeys(task);
        task = taskMapper.selectByPrimaryKey(key);
        System.out.println(task);

        taskMapper.deleteByPrimaryKey(key);
        task = taskMapper.selectByPrimaryKey(key);
        System.out.println(task);

    }
}
