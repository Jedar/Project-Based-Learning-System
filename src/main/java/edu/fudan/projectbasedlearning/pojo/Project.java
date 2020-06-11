package edu.fudan.projectbasedlearning.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import javax.persistence.*;

public class Project {
    @Id
    @Column(name = "project_id")
    private Integer projectId;

    @Column(name = "project_name")
    private String projectName;

    private String theme;

    @Column(name = "leader_id")
    private Integer leaderId;

    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @Column(name = "start_time")
    private Date startTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @Column(name = "end_time")
    private Date endTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @Column(name = "score_start_time")
    private Date scoreStartTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @Column(name = "score_end_time")
    private Date scoreEndTime;

    private String description;

    @Column(name = "course_id")
    private Integer courseId;

    /**
     * 用来联系user
     */
    @Transient
    private User user;

    /**
     * 用来联系course
     */
    @Transient
    private Course course;
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
     * @return project_name
     */
    public String getProjectName() {
        return projectName;
    }

    /**
     * @param projectName
     */
    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    /**
     * @return theme
     */
    public String getTheme() {
        return theme;
    }

    /**
     * @param theme
     */
    public void setTheme(String theme) {
        this.theme = theme;
    }

    /**
     * @return leader_id
     */
    public Integer getLeaderId() {
        return leaderId;
    }

    /**
     * @param leaderId
     */
    public void setLeaderId(Integer leaderId) {
        this.leaderId = leaderId;
    }

    /**
     * @return start_time
     */
    public Date getStartTime() {
        return startTime;
    }

    /**
     * @param startTime
     */
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    /**
     * @return end_time
     */
    public Date getEndTime() {
        return endTime;
    }

    /**
     * @param endTime
     */
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    /**
     * @return description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return course_id
     */
    public Integer getCourseId() {
        return courseId;
    }

    /**
     * @param courseId
     */
    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Date getScoreStartTime() {
        return scoreStartTime;
    }

    public void setScoreStartTime(Date scoreStartTime) {
        this.scoreStartTime = scoreStartTime;
    }

    public Date getScoreEndTime() {
        return scoreEndTime;
    }

    public void setScoreEndTime(Date scoreEndTime) {
        this.scoreEndTime = scoreEndTime;
    }
}
