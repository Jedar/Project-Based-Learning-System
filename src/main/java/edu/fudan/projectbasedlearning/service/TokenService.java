package edu.fudan.projectbasedlearning.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import edu.fudan.projectbasedlearning.pojo.User;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    public String getToken(User user) {
        String token="";
        token= JWT.create().withAudience(user.getUserId()+"")
                .sign(Algorithm.HMAC256(user.getPassword()));
        return token;
    }

    public int getId(String token){
        return Integer.parseInt(JWT.decode(token).getAudience().get(0));
    }
}
