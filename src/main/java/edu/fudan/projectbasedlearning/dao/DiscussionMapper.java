package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import edu.fudan.projectbasedlearning.pojo.Student;

import java.util.HashMap;
import java.util.List;

public interface DiscussionMapper extends Mapper<Discussion> {

    List<Discussion> getDiscussionsByProjectId(int projectId);
    List<Discussion> getDiscussionChildrenList(int projectId,int parentsId);

    HashMap<String,String> getDiscussionAuthor(int userId);
}
