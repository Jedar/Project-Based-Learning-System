package edu.fudan.projectbasedlearning.pojo;

public class ProjectScoreDistribute {
    Integer projectId;

    double value1;

    double value2;

    double value3;

    public ProjectScoreDistribute() {
        value1 = 0;
        value2 = 0;
        value3 = 0;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
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

    @Override
    public String toString() {
        return "ScoreDistribute{" +
                "projectId=" + projectId +
                ", value1=" + value1 +
                ", value2=" + value2 +
                ", value3=" + value3 +
                '}';
    }
}
