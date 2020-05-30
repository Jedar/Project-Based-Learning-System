package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import edu.fudan.projectbasedlearning.core.Service;

import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/28.
 */
public interface DiscussionService extends Service<Discussion> {
    List<Discussion> findAllDiscussionByProjectId(int projectId);
}
