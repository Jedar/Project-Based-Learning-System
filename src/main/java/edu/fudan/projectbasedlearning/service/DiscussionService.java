package edu.fudan.projectbasedlearning.service;

import edu.fudan.projectbasedlearning.pojo.Discussion;
import edu.fudan.projectbasedlearning.core.Service;

import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/28.
 */
public interface DiscussionService extends Service<Discussion> {
    List<Discussion> findFirstDiscussionByProjectId(int projectId);

    List<Discussion> findAllDiscussions(int projectId);

    List<Discussion> findAllChildrenOfDiscussion(int projectId, int parentsId);

    HashMap<String, String> findAuthorById(int studentId);

    int getPublishCount(int studentId);

    int getReplyCount(int studentId);

    void updateLikes(int discussionId,int likes);
}
