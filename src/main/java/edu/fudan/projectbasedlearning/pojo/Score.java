package edu.fudan.projectbasedlearning.pojo;

import java.util.Date;
import javax.persistence.*;

public class Score {

    @Column(name = "project_id")
    private Integer projectId;

    @Id
    @Column(name = "user_id")
    private Integer userId;

    /**
     * 0:讨论得分 1:表示自评得分 2:互评得分 3:老师评分
     */
    @Column(name = "score_type")
    private Integer scoreType;

    @Column(name = "scorer_id")
    private Integer scorerId;

    private Integer value;

    private Date time;

    private String comment;

    private double distribute;// score_distribute

    /**
     * @return project_id
     */
    public Integer getProjectId() {
        return projectId;
    }

    /**
     * @param projectId
     */
    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    /**
     * @return user_id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * @param userId
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 获取0:讨论得分 1:表示自评得分 2:互评得分 3:老师评分
     *
     * @return score_type - 0:讨论得分 1:表示自评得分 2:互评得分 3:老师评分
     */
    public Integer getScoreType() {
        return scoreType;
    }

    /**
     * 设置0:讨论得分 1:表示自评得分 2:互评得分 3:老师评分
     *
     * @param scoreType 0:讨论得分 1:表示自评得分 2:互评得分 3:老师评分
     */
    public void setScoreType(Integer scoreType) {
        this.scoreType = scoreType;
    }

    /**
     * @return scorer_id
     */
    public Integer getScorerId() {
        return scorerId;
    }

    /**
     * @param scorerId
     */
    public void setScorerId(Integer scorerId) {
        this.scorerId = scorerId;
    }

    /**
     * @return value
     */
    public Integer getValue() {
        return value;
    }

    /**
     * @param value
     */
    public void setValue(Integer value) {
        this.value = value;
    }

    /**
     * @return time
     */
    public Date getTime() {
        return time;
    }

    /**
     * @param time
     */
    public void setTime(Date time) {
        this.time = time;
    }

    /**
     * @return comment
     */
    public String getComment() {
        return comment;
    }

    /**
     * @param comment
     */
    public void setComment(String comment) {
        this.comment = comment;
    }

    public double getDistribute() {
        return distribute;
    }

    public void setDistribute(double distribute) {
        this.distribute = distribute;
    }

}
