package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Discussion;

import java.util.List;

public interface DiscussionMapper extends Mapper<Discussion> {

    List<Discussion> getDiscussionsByProjectId(int projectId);
}
