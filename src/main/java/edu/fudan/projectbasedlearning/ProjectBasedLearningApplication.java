package edu.fudan.projectbasedlearning;

import edu.fudan.projectbasedlearning.dao.ProjectMapper;
import edu.fudan.projectbasedlearning.dao.UserMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("edu.fudan.*.dao")
public class ProjectBasedLearningApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectBasedLearningApplication.class, args);
    }

}
