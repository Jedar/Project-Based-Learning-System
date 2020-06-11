package edu.fudan.projectbasedlearning.pojo;

import javax.persistence.Column;

public class ScoreDistribute {
    @Column(name = "project_id")
    private Integer projectId;

    @Column(name = "type")
    private Integer type;

    @Column(name = "distribute")
    private Double distribute;

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Double getDistribute() {
        return distribute;
    }

    public void setDistribute(Double distribute) {
        this.distribute = distribute;
    }

    @Override
    public String toString() {
        return "ScoreDistribute{" +
                "projectId=" + projectId +
                ", type=" + type +
                ", distribute=" + distribute +
                '}';
    }
}
