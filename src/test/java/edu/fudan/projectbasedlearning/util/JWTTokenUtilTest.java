package edu.fudan.projectbasedlearning.util;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.User;
import edu.fudan.projectbasedlearning.utils.JWTTokenUtil;
import org.junit.Assert;
import org.junit.Test;

public class JWTTokenUtilTest extends Tester {
    @Test
    public void test(){
        User user = new User();
        user.setUserId(1);
        user.setPassword("123456");
        String token = JWTTokenUtil.getToken(user);
        System.out.println(token);
        int id = JWTTokenUtil.getId(token);
        Assert.assertEquals(1, id);
        JWTTokenUtil.verify(token);
    }
}
