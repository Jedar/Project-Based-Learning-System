package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.Memo;
import edu.fudan.projectbasedlearning.core.Service;
import edu.fudan.projectbasedlearning.pojo.MemoMessage;

import java.util.List;


/**
 * Created by CodeGenerator on 2020/06/16.
 */
public interface MemoService extends Service<Memo> {
    List<MemoMessage> findByUser(int user);

    int getActiveCount(int user);
}
