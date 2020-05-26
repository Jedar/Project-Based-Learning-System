package edu.fudan.projectbasedlearning.pojo;

import javax.persistence.*;

public class User {
    @Id
    @Column(name = "user_id")
    private Integer userId;

    private String username;

    private String password;

    /**
     * 0表示管理员 1表示老师 2表示学生
     */
    private Integer role;

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
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取0表示管理员 1表示老师 2表示学生
     *
     * @return role - 0表示管理员 1表示老师 2表示学生
     */
    public Integer getRole() {
        return role;
    }

    /**
     * 设置0表示管理员 1表示老师 2表示学生
     *
     * @param role 0表示管理员 1表示老师 2表示学生
     */
    public void setRole(Integer role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                '}';
    }
}