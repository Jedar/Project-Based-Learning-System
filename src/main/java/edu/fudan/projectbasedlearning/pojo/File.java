package edu.fudan.projectbasedlearning.pojo;

import java.util.Date;
import javax.persistence.*;

public class File {
    @Id
    @Column(name = "file_id")
    private Integer fileId;

    @Column(name = "project_id")
    private Integer projectId;

    @Column(name = "file_name")
    private String fileName;

    private String path;

    @Column(name = "user_id")
    private Integer userId;

    private Date time;

    /**
     * @return file_id
     */
    public Integer getFileId() {
        return fileId;
    }

    /**
     * @param fileId
     */
    public void setFileId(Integer fileId) {
        this.fileId = fileId;
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
     * @return file_name
     */
    public String getFileName() {
        return fileName;
    }

    /**
     * @param fileName
     */
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    /**
     * @return path
     */
    public String getPath() {
        return path;
    }

    /**
     * @param path
     */
    public void setPath(String path) {
        this.path = path;
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

    @Override
    public String toString() {
        return "File{" +
                "fileId=" + fileId +
                ", projectId=" + projectId +
                ", fileName='" + fileName + '\'' +
                ", path='" + path + '\'' +
                ", userId=" + userId +
                ", time=" + time +
                '}';
    }
}