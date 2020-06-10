package edu.fudan.projectbasedlearning.controller;

import edu.fudan.projectbasedlearning.annotation.PassToken;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.utils.VerifyUtil;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * created by 姜向阳
 * on 2020/5/18
 */
@Controller
@Api(value = "验证相关接口",tags = "验证相关接口")
public class VerifyController {
    private static final Logger logger = LoggerFactory.getLogger(VerifyUtil.class);
    public static final String RANDOMCODEKEY= "RandomCheckCode";//放到session中的key，以用于与从前端接收到的输入比较
    /**
     * 生成验证码
     */
    @PassToken
    @RequestMapping(value = "/getVerify")
    public void getVerify(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片
            response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            VerifyUtil randomValidateCode = new VerifyUtil();
            randomValidateCode.getRandcode(request, response);//输出验证码图片方法
        } catch (Exception e) {
            logger.error("获取验证码失败>>>>   ", e);
        }
    }
    @PassToken
    @GetMapping(value="/checkCode/{checkCode}")
    @ResponseBody
    public Result checkCode(HttpServletRequest request ,@PathVariable String checkCode){
        //TODO: 验证码比较
        String sessionCheckCode = (String) request.getSession().getAttribute(RANDOMCODEKEY);
        if (checkCode.toLowerCase().equals(sessionCheckCode.toLowerCase()))//验证码判断，不区分大小写
            return ResultGenerator.genSuccessResult();
        else
            return ResultGenerator.genFailResult("验证码错误");
    }

}

