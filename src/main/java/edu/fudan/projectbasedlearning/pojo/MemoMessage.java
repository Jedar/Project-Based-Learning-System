package edu.fudan.projectbasedlearning.pojo;

import javax.persistence.Column;
import javax.persistence.Id;

public class MemoMessage {
    @Id
    @Column(name = "memo_id")
    private Integer memoId;

    @Column(name = "send_id")
    private Integer sendId;

    @Column(name = "send_name")
    private String sendName;

    @Column(name = "send_role")
    private Integer sendRole;

    @Column(name = "recv_id")
    private Integer recvId;

    @Column(name = "task_id")
    private Integer taskId;

    @Column(name = "project_id")
    private Integer projectId;

    @Column(name = "project_name")
    private String projectName;

    private String message;

    /**
     * 0代表未读，1代表已读
     */
    @Column(name = "read_or_not")
    private Integer read;

    public Integer getMemoId() {
        return memoId;
    }

    public void setMemoId(Integer memoId) {
        this.memoId = memoId;
    }

    public Integer getSendId() {
        return sendId;
    }

    public void setSendId(Integer sendId) {
        this.sendId = sendId;
    }

    public String getSendName() {
        return sendName;
    }

    public void setSendName(String sendName) {
        this.sendName = sendName;
    }

    public Integer getSendRole() {
        return sendRole;
    }

    public void setSendRole(Integer sendRole) {
        this.sendRole = sendRole;
    }

    public Integer getRecvId() {
        return recvId;
    }

    public void setRecvId(Integer recvId) {
        this.recvId = recvId;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getRead() {
        return read;
    }

    public void setRead(Integer read) {
        this.read = read;
    }

    @Override
    public String toString() {
        return "MemoMessage{" +
                "memoId=" + memoId +
                ", sendId=" + sendId +
                ", sendName='" + sendName + '\'' +
                ", sendRole=" + sendRole +
                ", recvId=" + recvId +
                ", taskId=" + taskId +
                ", projectId=" + projectId +
                ", projectName='" + projectName + '\'' +
                ", message='" + message + '\'' +
                ", read=" + read +
                '}';
    }
}
