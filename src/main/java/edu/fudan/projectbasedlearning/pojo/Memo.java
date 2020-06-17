package edu.fudan.projectbasedlearning.pojo;

import javax.persistence.*;

public class Memo {
    @Id
    @Column(name = "memo_id")
    private Integer memoId;

    @Column(name = "send_id")
    private Integer sendId;

    @Column(name = "recv_id")
    private Integer recvId;

    @Column(name = "task_id")
    private Integer taskId;

    private String message;

    /**
     * 0代表未读，1代表已读
     */
    @Column(name = "read_or_not")
    private Integer read;

    /**
     * @return memo_id
     */
    public Integer getMemoId() {
        return memoId;
    }

    /**
     * @param memoId
     */
    public void setMemoId(Integer memoId) {
        this.memoId = memoId;
    }

    /**
     * @return send_id
     */
    public Integer getSendId() {
        return sendId;
    }

    /**
     * @param sendId
     */
    public void setSendId(Integer sendId) {
        this.sendId = sendId;
    }

    /**
     * @return recv_id
     */
    public Integer getRecvId() {
        return recvId;
    }

    /**
     * @param recvId
     */
    public void setRecvId(Integer recvId) {
        this.recvId = recvId;
    }

    /**
     * @return task_id
     */
    public Integer getTaskId() {
        return taskId;
    }

    /**
     * @param taskId
     */
    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    /**
     * @return message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * 获取0代表未读，1代表已读
     *
     * @return read - 0代表未读，1代表已读
     */
    public Integer getRead() {
        return read;
    }

    /**
     * 设置0代表未读，1代表已读
     *
     * @param read 0代表未读，1代表已读
     */
    public void setRead(Integer read) {
        this.read = read;
    }
}