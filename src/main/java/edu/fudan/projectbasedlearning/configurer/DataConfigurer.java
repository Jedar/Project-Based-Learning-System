package edu.fudan.projectbasedlearning.configurer;

import edu.fudan.projectbasedlearning.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataConfigurer {

    @Bean
    public User getUser(){
        User user = new User();
        user.setUserId(1);
        user.setUsername("123");
        user.setRole(1);
        return user;
    }

}
