package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Score;
import edu.fudan.projectbasedlearning.pojo.ScoreDistribute;

import java.util.List;

public interface ScoreMapper extends Mapper<Score> {
    List<Score> findStudentScores(int studentId,int projectId);

    void insertScore(Score score);

    void deleteScore(int studentId);

    List<Score> getAllScores(int projectId);
    List<ScoreDistribute> findScoreDistribute(int projectId);

    void updateScoreDistribute(int projectId, double val1, double val2, double val3);
}
