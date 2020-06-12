package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.DiscussionMapper;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import edu.fudan.projectbasedlearning.service.DiscussionService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/28.
 */
@Service
@Transactional
public class DiscussionServiceImpl extends AbstractService<Discussion> implements DiscussionService {
    @Resource
    private DiscussionMapper discussionMapper;

    @Override
    public List<Discussion> findFirstDiscussionByProjectId(int projectId) {
        return discussionMapper.getFirstDiscussionsByProjectId(projectId);
    }

    @Override
    public List<Discussion> findAllDiscussions(int projectId) {
        return discussionMapper.getAllDiscussions(projectId);
    }

    @Override
    public List<Discussion> findAllChildrenOfDiscussion(int projectId, int parentsId) {
        return discussionMapper.getDiscussionChildrenList(projectId, parentsId);
    }

    @Override
    public List<Discussion> findMyDiscussion(int projectId, int studentId) {
        return discussionMapper.getMyDiscussions(projectId,studentId);
    }

    @Override
    public HashMap<String, String> findAuthorById(int studentId) {
        return discussionMapper.getDiscussionAuthor(studentId);
    }

    @Override
    public int getPublishCount(int studentId) {
        return discussionMapper.getPublishCount(studentId);
    }

    @Override
    public int getReplyCount(int studentId) {
        return discussionMapper.getReplyCount(studentId);
    }

    @Override
    public void updateLikes(int discussionId, int likes) {
        discussionMapper.updateLikes(discussionId,likes);
    }
}
