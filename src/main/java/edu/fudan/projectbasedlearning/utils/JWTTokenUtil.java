package edu.fudan.projectbasedlearning.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.Date;

public class JWTTokenUtil {

    private static final long EXPIRATION_TIME = 3600_000L; // 3600_000_000L = 1000 hour 有效期

    private static String SECRET = "WEB-PBL";

    // 根据用户获取Token
    public static String getToken(User user) {
        String token="";
        token= JWT.create().withAudience(user.getUserId()+"")
                .withClaim("role", user.getRole())
                .withExpiresAt(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(SECRET));
        return token;
    }

    // 从Token获取id
    public static int getId(String token){
        return Integer.parseInt(JWT.decode(token).getAudience().get(0));
    }

    // 验证Token
    public static void verify(String token)throws JWTVerificationException {
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
        jwtVerifier.verify(token);
    }

    // 获取权限类型
    public static int getRole(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        Claim claim = decodedJWT.getClaim("role");
        return claim.asInt();
    }

}

