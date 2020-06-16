package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.Memo;
import edu.fudan.projectbasedlearning.pojo.MemoMessage;

import java.util.List;

public interface MemoMapper extends Mapper<Memo> {

    List<MemoMessage> findByRecvId(int userId);

    List<MemoMessage> findActiveByRecvId(int userId);
}