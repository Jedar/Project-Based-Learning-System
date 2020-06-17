package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import org.junit.Test;

import javax.annotation.Resource;

public class MemoMapperTest extends Tester {
    @Resource
    MemoMapper memoMapper;

    @Test
    public void testGet(){
        System.out.println(memoMapper.findByRecvId(10009));
        System.out.println(memoMapper.findByRecvId(10000));
    }

    @Test
    public void testGetActive(){
        System.out.println(memoMapper.findActiveByRecvId(10009));
        System.out.println(memoMapper.findActiveByRecvId(10000));
    }
}
