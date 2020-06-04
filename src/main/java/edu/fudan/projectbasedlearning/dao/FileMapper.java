package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.core.Mapper;
import edu.fudan.projectbasedlearning.pojo.File;

import java.util.HashMap;
import java.util.List;

public interface FileMapper extends Mapper<File> {

    /* 根据项目获取所有资源列表 */
    public List<File> getFilesByProject(Integer projectId);

    public List<HashMap<String,Object>> getFileInfoByProject(Integer projectId);
}