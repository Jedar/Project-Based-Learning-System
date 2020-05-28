package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.HashMap;

public interface UserMapper extends Mapper<User> {

    HashMap<String,String> getTeacher(Integer id);
    User findByUserNameAndPassword(User user);
    int insertUser(User user);
}
