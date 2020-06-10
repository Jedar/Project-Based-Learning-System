package edu.fudan.projectbasedlearning.controller;

import io.swagger.annotations.Api;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "测试接口",tags = "测试接口")
@RequestMapping("/")
public class HelloController {

    @RequestMapping("/hello")
    public ResponseEntity<String> response(){
        return new ResponseEntity<>("Hello World",HttpStatus.OK);
    }
}
