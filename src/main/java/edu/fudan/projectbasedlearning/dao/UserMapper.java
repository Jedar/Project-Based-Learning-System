package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.User;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;


public interface UserMapper extends Mapper<User> {

    public HashMap<String,String> getTeacher(Integer id);
}