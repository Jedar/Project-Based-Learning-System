package edu.fudan.projectbasedlearning.pojo;

import javax.persistence.*;

public class Student {
    @Id
    @Column(name = "s_id")
    private Integer sId;

    private String gender;

    private String school;

    private String profile;

    @Transient
    private User user;

    /**
     * @return s_id
     */
    public Integer getsId() {
        return sId;
    }

    /**
     * @param sId
     */
    public void setsId(Integer sId) {
        this.sId = sId;
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
