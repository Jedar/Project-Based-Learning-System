package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.Discussion;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class DiscussionMapperTest extends Tester {
    @Resource
    private DiscussionMapper discussionMapper;

    @Test
    public void testSave() {
        Discussion discussion = new Discussion();
        discussion.setContent("a child demo");
        discussion.setLikes(3);
        discussion.setProjectId(1);
        discussion.setTime(new Date());
        discussion.setUserId(10017);
        discussion.setParentsId(2);
        discussionMapper.insert(discussion);
    }

    @Test
    public void testGetDiscussionsByProjectId() {
        List<Discussion> discussionList = discussionMapper.getFirstDiscussionsByProjectId(1);
        System.out.println(discussionList.get(0).getLikes());
        System.out.println(discussionList.get(0).getDiscussionId());
        System.out.println(discussionList.get(0).getProjectId());
    }

    @Test
    public void testGetDiscussionChildren() {
        List<Discussion> discussionList = discussionMapper.getDiscussionChildrenList(1, 2);
        System.out.println(discussionList.get(0).getLikes());
        System.out.println(discussionList.get(0).getDiscussionId());
        System.out.println(discussionList.get(0).getProjectId());
    }

    @Test
    public void testGetAuthor() {
        HashMap<String, String> studentInfo = discussionMapper.getDiscussionAuthor(10009);
        System.out.println(studentInfo);
    }

    @Test
    public void testGetAllDiscussions() {
        List<Discussion> discussionList = discussionMapper.getAllDiscussions(1);
        for (Discussion discussion : discussionList) {
            System.out.println(discussion);
        }
    }

    @Test
    public void testGetPublishCount(){
        int count = discussionMapper.getPublishCount(10009);
        System.out.println(count);
    }

    @Test
    public void testGetReplyCount(){
        int count = discussionMapper.getReplyCount(10009);
        System.out.println(count);
    }

    @Test
    public void testUpdateLikes(){
        int id = 2;
        int likes = 3;
        discussionMapper.updateLikes(id,likes);
    }
}
