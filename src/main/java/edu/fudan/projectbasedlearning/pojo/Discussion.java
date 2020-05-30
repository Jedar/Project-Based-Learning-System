package edu.fudan.projectbasedlearning.pojo;

import java.util.Date;
import javax.persistence.*;

public class Discussion {
    @Id
    @Column(name = "discussion_id")
    private Integer discussionId;

    @Column(name = "project_id")
    private Integer projectId;

    private Date time;

    @Column(name = "user_id")
    private Integer userId;

    private Integer likes;

    @Column(name = "parents_id")
    private Integer parentsId;

    private String content;

    /**
     * @return discussion_id
     */
    public Integer getDiscussionId() {
        return discussionId;
    }

    /**
     * @param discussionId
     */
    public void setDiscussionId(Integer discussionId) {
        this.discussionId = discussionId;
    }

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
     * @return likes
     */
    public Integer getLikes() {
        return likes;
    }

    /**
     * @param likes
     */
    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    /**
     * @return parents_id
     */
    public Integer getParentsId() {
        return parentsId;
    }

    /**
     * @param parentsId
     */
    public void setParentsId(Integer parentsId) {
        this.parentsId = parentsId;
    }

    /**
     * @return content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content
     */
    public void setContent(String content) {
        this.content = content;
    }
}