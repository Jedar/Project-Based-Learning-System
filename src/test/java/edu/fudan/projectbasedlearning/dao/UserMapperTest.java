package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.User;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

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
}
