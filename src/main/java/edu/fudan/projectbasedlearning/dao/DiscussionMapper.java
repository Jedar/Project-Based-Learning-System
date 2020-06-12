package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import edu.fudan.projectbasedlearning.pojo.Student;

import java.util.HashMap;
import java.util.List;

public interface DiscussionMapper extends Mapper<Discussion> {

    List<Discussion> getFirstDiscussionsByProjectId(int projectId);

    List<Discussion> getAllDiscussions(int projectId);

    List<Discussion> getDiscussionChildrenList(int projectId, int parentsId);

    HashMap<String, String> getDiscussionAuthor(int userId);

    int getPublishCount(int userId);

    int getReplyCount(int userId);

    void updateLikes(int discussionId,int likes);

    List<Discussion> getMyDiscussions(int projectId,int studentId);
}
