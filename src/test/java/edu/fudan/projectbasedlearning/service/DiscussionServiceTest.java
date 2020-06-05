package edu.fudan.projectbasedlearning.service;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


class DiscussionServiceTest extends Tester {
    @Autowired
    private DiscussionService discussionService;

    @Test
    void findAllDiscussionByProjectId() {
        List<Discussion> discussionList = discussionService.findFirstDiscussionByProjectId(1);
        System.out.println(discussionList.get(0).getDiscussionId());
    }
}
