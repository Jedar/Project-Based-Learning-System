package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.MemoMapper;
import edu.fudan.projectbasedlearning.pojo.Memo;
import edu.fudan.projectbasedlearning.pojo.MemoMessage;
import edu.fudan.projectbasedlearning.service.MemoService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/06/16.
 */
@Service
@Transactional
public class MemoServiceImpl extends AbstractService<Memo> implements MemoService {
    @Resource
    private MemoMapper memoMapper;


    @Override
    public List<MemoMessage> findByUser(int user) {
        return memoMapper.findByRecvId(user);
    }

    @Override
    public int getActiveCount(int user) {
        return memoMapper.findActiveByRecvId(user).size();
    }
}
