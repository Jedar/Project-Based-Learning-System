package edu.fudan.projectbasedlearning.service;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Score;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

class ScoreServiceTest extends Tester {
    @Autowired
    private ScoreService scoreService;

    @Test
    void findScoresByStudentId() {
        List<Score> scores = scoreService.findScoresByStudentId(10009);
        System.out.println(scores.get(0).getValue());
    }

    @Test
    void saveScore() {
        Score score = new Score();
        score.setProjectId(1);
        score.setScorerId(10009);
        score.setScoreType(1);
        score.setTime(new Date());
        score.setUserId(10009);
        score.setValue(100);
        score.setComment("comment");
        scoreService.saveScore(score);
    }
}
