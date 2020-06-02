package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.ScoreMapper;
import edu.fudan.projectbasedlearning.pojo.Score;
import edu.fudan.projectbasedlearning.service.ScoreService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
@Service
@Transactional
public class ScoreServiceImpl extends AbstractService<Score> implements ScoreService {
    @Resource
    private ScoreMapper scoreMapper;

    @Override
    public List<Score> findScoresByStudentId(int studentId) {

        return scoreMapper.findStudentScores(studentId);
    }

    @Override
    public boolean saveScore(Score score) {
        try {
            scoreMapper.insertScore(score);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;

    }
}
