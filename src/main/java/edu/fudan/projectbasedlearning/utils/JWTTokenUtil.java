package edu.fudan.projectbasedlearning.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import edu.fudan.projectbasedlearning.pojo.User;

import java.util.Date;

public class JWTTokenUtil {

    private static final long EXPIRATION_TIME = 3600_000_000L; // 1000 hour 有效期

    private static String SECRET = "WEB-PBL";

    public static String getToken(User user) {
        String token="";
        token= JWT.create().withAudience(user.getUserId()+"")
                .withExpiresAt(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(SECRET));
        return token;
    }

    public static int getId(String token){
        return Integer.parseInt(JWT.decode(token).getAudience().get(0));
    }

    public static void verify(String token)throws JWTVerificationException {
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
        jwtVerifier.verify(token);
    }

}

