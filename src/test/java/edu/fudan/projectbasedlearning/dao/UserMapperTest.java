package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.ProjectBasedLearningApplication;
import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjectBasedLearningApplication.class)
@Transactional
@Rollback
public class UserMapperTest extends Tester {
    @Resource
    private UserMapper userMapper;

    @Test
    public void test(){
        List<User> userList = userMapper.selectAll();
        for(User user: userList){
            System.out.println(user);
        }
        System.out.println(userList);
    }

    @Test
    public void teacher(){
        HashMap<String,String> hash = userMapper.getTeacher(10000);
        System.out.println(hash);
    }

    @Test
    public void testFindByUserNameAndPassword(){
        User user = new User();
        user.setUsername("11111");
        user.setPassword("111111");
        User result =  userMapper.findByUserNameAndPassword(user);
        System.out.println(result);
    }
    @Test
    public void testIsUserNameUnique(){
        User user = new User();
        user.setUsername("11111");
        List<User> userList = userMapper.select(user);
        for(User user1: userList){
            System.out.println(user1);
        }
        System.out.println(userList);
    }
    @Test
    public void testSave() {
        User user = new User();
        user.setUsername("jxy123");
        user.setPassword("123456");
        user.setRole(2);
        System.out.println(userMapper.insertSelective(user));
    }
    @Test
    public void update(){
        User user = userMapper.selectByPrimaryKey(10000);
        System.out.println(user);
        user.setUsername("asd");
        userMapper.updateByPrimaryKey(user);
        user = userMapper.selectByPrimaryKey(10000);
        System.out.println(user);
    }

    @Test
    public void getStudentInfo() {
        HashMap<String, Object> hash = userMapper.getStudentInfo(10009);
        System.out.println(hash);
    }

    @Test
    public void modifyStudentInfo() {
        System.out.println(userMapper.getStudent(10009));

        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("studentId", 10009);
        hashMap.put("username", "aaa");
        hashMap.put("password", "bbb");
        hashMap.put("gender", "女");
        hashMap.put("profile", "ccc");

        userMapper.modifyStudentInfo(hashMap);

        System.out.println(userMapper.getStudent(10009));
    }

    @Test
    public void getTeacherInfo() {
        HashMap<String, Object> hash = userMapper.getTeacherInfo(10000);
        System.out.println(hash);
    }

    @Test
    public void modifyTeacherInfo() {
        System.out.println(userMapper.getTeacher(10000));

        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("teacherId", 10000);
        hashMap.put("username", "aaa");
        hashMap.put("password", "bbb");
        hashMap.put("gender", "女");
        hashMap.put("profile", "ccc");

        userMapper.modifyTeacherInfo(hashMap);

        System.out.println(userMapper.getTeacher(10000));
    }
}
