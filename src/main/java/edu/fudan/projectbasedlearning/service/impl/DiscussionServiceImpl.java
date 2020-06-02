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
    public List<Discussion> findAllDiscussionByProjectId(int projectId) {
        return discussionMapper.getDiscussionsByProjectId(projectId);
    }

    @Override
    public List<Discussion> findAllChildrenOfDiscussion(int projectId, int parentsId) {
        return discussionMapper.getDiscussionChildrenList(projectId,parentsId);
    }

    @Override
    public HashMap<String, String> findAuthorById(int studentId) {
        return discussionMapper.getDiscussionAuthor(studentId);
    }
}
