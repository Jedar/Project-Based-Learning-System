package edu.fudan.projectbasedlearning.service.impl;

import edu.fudan.projectbasedlearning.dao.FileMapper;
import edu.fudan.projectbasedlearning.pojo.File;
import edu.fudan.projectbasedlearning.service.FileService;
import edu.fudan.projectbasedlearning.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
@Service
@Transactional
public class FileServiceImpl extends AbstractService<File> implements FileService {
    @Resource
    private FileMapper fileMapper;

    @Override
    public List<HashMap<String, Object>> getFileListOf(int projectId) {
        return fileMapper.getFileInfoByProject(projectId);
    }

    @Override
    public void deleteFile(int fileId) {
        fileMapper.deleteByPrimaryKey(fileId);
    }

    @Override
    public void addFile(File file) {
        fileMapper.insert(file);
    }
}
