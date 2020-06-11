package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Score;
import edu.fudan.projectbasedlearning.core.Service;

import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
public interface ScoreService extends Service<Score> {
    List<Score> findScoresByStudentId(int studentId);

    boolean saveScore(Score score);

    List<Score> findAllScores();
}
