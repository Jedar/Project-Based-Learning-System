package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Score;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

public class ScoreMapperTest extends Tester {
    @Resource
    private ScoreMapper scoreMapper;

    @Test
    public void testInsertScore(){
        Score score = new Score();
        score.setProjectId(1);
        score.setScorerId(10009);
        score.setScoreType(2);
        score.setTime(new Date());
        score.setUserId(10009);
        score.setValue(100);
        score.setComment("comment");
        scoreMapper.insertScore(score);
    }

    @Test
    public void testFindStudentScores(){
        List<Score> scores = scoreMapper.findStudentScores(10009);
        System.out.println(scores.get(0).getValue());
        System.out.println(scores.get(0).getDistribute());
        System.out.println(scores.get(0).getScorerId());
    }

    @Test
    public void testDeleteScore(){
        scoreMapper.deleteScore(10009);
    }
}