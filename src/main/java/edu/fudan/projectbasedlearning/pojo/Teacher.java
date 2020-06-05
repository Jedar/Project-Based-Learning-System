package edu.fudan.projectbasedlearning.pojo;

import javax.persistence.*;

public class Teacher {
    @Id
    @Column(name = "t_id")
    private Integer tId;

    private String gender;

    private String school;

    private String profile;

    @Transient
    private User user;
    /**
     * @return t_id
     */
    public Integer gettId() {
        return tId;
    }

    /**
     * @param tId
     */
    public void settId(Integer tId) {
        this.tId = tId;
    }

    /**
     * @return gender
     */
    public String getGender() {
        return gender;
    }

    /**
     * @param gender
     */
    public void setGender(String gender) {
        this.gender = gender;
    }

    /**
     * @return school
     */
    public String getSchool() {
        return school;
    }

    /**
     * @param school
     */
    public void setSchool(String school) {
        this.school = school;
    }

    /**
     * @return profile
     */
    public String getProfile() {
        return profile;
    }

    /**
     * @param profile
     */
    public void setProfile(String profile) {
        this.profile = profile;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
