package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.FileMapper;
import edu.fudan.projectbasedlearning.pojo.File;
import edu.fudan.projectbasedlearning.service.FileService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
@Service
@Transactional
public class FileServiceImpl extends AbstractService<File> implements FileService {
    @Resource
    private FileMapper fileMapper;

}
