package edu.fudan.projectbasedlearning.request;

public class EditTaskRequest {
    private int projectId;
    private int taskId;
    private int state;
    private String comment;

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "EditTaskRequest{" +
                "projectId=" + projectId +
                ", taskId=" + taskId +
                ", state=" + state +
                ", comment='" + comment + '\'' +
                '}';
    }
}
