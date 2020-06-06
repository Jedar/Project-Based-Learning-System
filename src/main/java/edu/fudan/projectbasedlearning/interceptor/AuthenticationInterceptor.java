package edu.fudan.projectbasedlearning.interceptor;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import edu.fudan.projectbasedlearning.annotation.PassToken;
import edu.fudan.projectbasedlearning.annotation.UserLoginToken;
import edu.fudan.projectbasedlearning.configurer.WebMvcConfigurer;
import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultCode;
import edu.fudan.projectbasedlearning.core.ServiceException;
import edu.fudan.projectbasedlearning.dao.UserMapper;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.utils.JWTTokenUtil;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

public class AuthenticationInterceptor implements HandlerInterceptor {

    private final Logger logger = LoggerFactory.getLogger(AuthenticationInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object object) throws Exception {
        // 从 http 请求头中取出 token
        String token = httpServletRequest.getHeader("token");

        // 如果不是映射到方法直接通过
        if(!(object instanceof HandlerMethod)){
            return true;
        }
        HandlerMethod handlerMethod=(HandlerMethod)object;
        Method method=handlerMethod.getMethod();
        //检查是否有passtoken注释，有则跳过认证
        if (method.isAnnotationPresent(PassToken.class)) {
            PassToken passToken = method.getAnnotation(PassToken.class);
            if (passToken.required()) {
                return true;
            }
        }
        //检查有没有需要用户权限的注解
        if (method.isAnnotationPresent(UserLoginToken.class)) {
            UserLoginToken userLoginToken = method.getAnnotation(UserLoginToken.class);
            String[] roles = userLoginToken.roles();
            if (userLoginToken.required()) {
                // 执行认证
                if (token == null) {
                    failAuth(httpServletRequest,httpServletResponse,"无token，请重新登录");
                    return false;
                }
                System.out.println(token);
                // 获取 token 中的 user id
                int userId;
                String role;
                try {
                    userId = JWTTokenUtil.getId(token);
                    System.out.println(userId);
                    role = getRoleString(JWTTokenUtil.getRole(token));
                } catch (JWTDecodeException j) {
                    failAuth(httpServletRequest,httpServletResponse,"token错误");
                    return false;
                }
                /* 检查用户权限 */
                boolean valid = false;
                for(String s : roles){
                    if(s.equals("None")){
                        valid = true;
                        break;
                    }
                    if(role.equals(s)){
                        valid = true;
                        break;
                    }
                }
                if(!valid){
                    failAuth(httpServletRequest,httpServletResponse,"用户权限不足");
                    return false;
                }
                // 验证 token
                try {
                    JWTTokenUtil.verify(token);
                } catch (JWTVerificationException e) {
                    failAuth(httpServletRequest,httpServletResponse,"token错误");
                    return false;
                }
                return true;
            }
        }
        return true;
    }

    private void failAuth(HttpServletRequest request, HttpServletResponse response, String message){
        logger.warn("签名认证失败，请求接口：{}，请求IP：{}，请求参数：{}",
                request.getRequestURI(), getIpAddress(request), JSON.toJSONString(request.getParameterMap()));

        Result result = new Result();
        result.setCode(ResultCode.UNAUTHORIZED).setMessage(message);
        responseResult(response, result);
    }

    private void responseResult(HttpServletResponse response, Result result) {
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        response.setStatus(200);
        try {
            response.getWriter().write(JSON.toJSONString(result));
        } catch (IOException ex) {
            logger.error(ex.getMessage());
        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest,
                           HttpServletResponse httpServletResponse,
                           Object o, ModelAndView modelAndView) throws Exception {

    }
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest,
                                HttpServletResponse httpServletResponse,
                                Object o, Exception e) throws Exception {
    }

    private String getIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        // 如果是多级代理，那么取第一个ip为客户端ip
        if (ip != null && ip.indexOf(",") != -1) {
            ip = ip.substring(0, ip.indexOf(",")).trim();
        }

        return ip;
    }

    private String getRoleString(int val){
        switch (val){
            case 0:
                return "Manager";
            case 1:
                return "Teacher";
            case 2:
                return "Student";
            default:
                return "None";
        }
    }
}
