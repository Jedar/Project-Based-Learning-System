package edu.fudan.projectbasedlearning.service;
import edu.fudan.projectbasedlearning.pojo.File;
import edu.fudan.projectbasedlearning.core.Service;

import java.util.HashMap;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/29.
 */
public interface FileService extends Service<File> {

    List<HashMap<String,Object>> getFileListOf(int projectId);

    void deleteFile(int fileId);

    void addFile(File file);
}
