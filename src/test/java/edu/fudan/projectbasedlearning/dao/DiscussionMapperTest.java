package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

public class DiscussionMapperTest extends Tester {
    @Resource
    private DiscussionMapper discussionMapper;

    @Test
    public void testSave(){
        Discussion discussion = new Discussion();
        discussion.setContent("a demo");
        discussion.setLikes(2);
       discussion.setProjectId(1);
       discussion.setTime(new Date());
       discussion.setUserId(10009);
       discussionMapper.insert(discussion);
    }

    @Test
    public void testGetDiscussionsByProjectId(){
        List<Discussion> discussionList = discussionMapper.getDiscussionsByProjectId(1);
        System.out.println(discussionList.get(0).getLikes());
        System.out.println(discussionList.get(0).getDiscussionId());
        System.out.println(discussionList.get(0).getProjectId());
    }
}
