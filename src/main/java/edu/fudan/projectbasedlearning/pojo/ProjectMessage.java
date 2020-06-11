package edu.fudan.projectbasedlearning.pojo;

public class ProjectMessage {
    int projectId;
    String projectName;
    String theme;
    int leaderId;
    String startTime;
    String endTime;
    String scoreStartTime;
    String scoreEndTime;
    String description;
    double value1;
    double value2;
    double value3;

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public int getLeaderId() {
        return leaderId;
    }

    public void setLeaderId(int leaderId) {
        this.leaderId = leaderId;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getValue1() {
        return value1;
    }

    public void setValue1(double value1) {
        this.value1 = value1;
    }

    public double getValue2() {
        return value2;
    }

    public void setValue2(double value2) {
        this.value2 = value2;
    }

    public double getValue3() {
        return value3;
    }

    public void setValue3(double value3) {
        this.value3 = value3;
    }

    public String getScoreStartTime() {
        return scoreStartTime;
    }

    public void setScoreStartTime(String scoreStartTime) {
        this.scoreStartTime = scoreStartTime;
    }

    public String getScoreEndTime() {
        return scoreEndTime;
    }

    public void setScoreEndTime(String scoreEndTime) {
        this.scoreEndTime = scoreEndTime;
    }

    @Override
    public String toString() {
        return "ProjectMessage{" +
                "projectId=" + projectId +
                ", projectName='" + projectName + '\'' +
                ", theme='" + theme + '\'' +
                ", leaderId=" + leaderId +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", scoreStartTime='" + scoreStartTime + '\'' +
                ", scoreEndTime='" + scoreEndTime + '\'' +
                ", description='" + description + '\'' +
                ", value1=" + value1 +
                ", value2=" + value2 +
                ", value3=" + value3 +
                '}';
    }
}
