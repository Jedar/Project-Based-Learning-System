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

    private static final long EXPIRATION_TIME = 3600_000_000L; // 1000 hour 有效期

    private static String SECRET = "WEB-PBL";

    public static String getToken(User user) {
        String token="";
        System.out.println("Role: "+user.getRole());
        token= JWT.create().withAudience(user.getUserId()+"")
                .withClaim("role", user.getRole())
                .withExpiresAt(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(SECRET));
        System.out.println("real: "+token);
        System.out.println(user);
        return token;
    }

    public static int getId(String token){
        return Integer.parseInt(JWT.decode(token).getAudience().get(0));
    }

    public static void verify(String token)throws JWTVerificationException {
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
        jwtVerifier.verify(token);
    }

    public static int getRole(String token) {
        System.out.println("role:"+token);
        DecodedJWT decodedJWT = JWT.decode(token);
        Claim claim = decodedJWT.getClaim("role");
        System.out.println(decodedJWT.getClaims());
        return claim.asInt();
    }

}

