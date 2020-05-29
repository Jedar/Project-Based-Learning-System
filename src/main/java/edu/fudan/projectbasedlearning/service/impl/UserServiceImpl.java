package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.StudentMapper;
import edu.fudan.projectbasedlearning.dao.UserMapper;
import edu.fudan.projectbasedlearning.pojo.Student;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.service.UserService;
import edu.fudan.projectbasedlearning.core.AbstractService;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/26.
 */
@Service
@Transactional
public class UserServiceImpl extends AbstractService<User> implements UserService {

    @Resource
    private StudentMapper studentMapper;
    @Resource
    private UserMapper userMapper;

    /**
     * 同时插入user 和 student
     * @param student
     * @return
     */
    public int saveStudent(Student student){
        int result;
        result = userMapper.insertUser(student.getUser());
        student.setsId(student.getUser().getUserId());
        result = studentMapper.insertSelective(student);
        return result;
    }
    @Override
    public User findByUsernameAndPassword(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return userMapper.findByUserNameAndPassword(user);
    }

}
