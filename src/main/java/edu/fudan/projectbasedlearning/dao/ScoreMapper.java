package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Score;

import java.util.List;

public interface ScoreMapper extends Mapper<Score> {
    List<Score> findStudentScores(int studentId);

    void insertScore(Score score);

    void deleteScore(int studentId);
}
