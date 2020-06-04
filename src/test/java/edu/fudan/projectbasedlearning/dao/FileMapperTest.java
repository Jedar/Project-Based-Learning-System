package edu.fudan.projectbasedlearning.dao;

import edu.fudan.projectbasedlearning.Tester;
import edu.fudan.projectbasedlearning.pojo.File;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Transactional
@Rollback
public class FileMapperTest extends Tester {
    @Resource
    private FileMapper fileMapper;

    @Test
    public void testGetFilesByProject(){
        List<File> files = fileMapper.getFilesByProject(1);
        File file = new File();
        file.setProjectId(1);
//        files = fileMapper.select(file);
        for(File f : files){
            System.out.println(f);
        }
    }

    @Test
    public void testGetFileInfoByProject(){
        List<HashMap<String,Object>> files = fileMapper.getFileInfoByProject(1);
        File file = new File();
        file.setProjectId(1);
//        files = fileMapper.select(file);
        for(HashMap<String,Object> f : files){
            System.out.println(f);
        }
    }

    @Test
    public void testInsert(){
        File file =new File();
        file.setFileName("测试文件");
        file.setPath("/fail/1.txt");
        file.setProjectId(1);
        file.setTime(new Date());
        file.setUserId(10000);
        int id = fileMapper.insertUseGeneratedKeys(file);
        file = fileMapper.selectByPrimaryKey(id);
        System.out.println(file);
    }

    @Test
    public void testDelete(){
        File file =new File();
        file.setFileName("测试文件");
        file.setPath("/fail/1.txt");
        file.setProjectId(1);
        file.setTime(new Date());
        file.setUserId(10000);
        int id = fileMapper.insertUseGeneratedKeys(file);
        file = fileMapper.selectByPrimaryKey(id);
        System.out.println(file);
        fileMapper.deleteByPrimaryKey(id);
        file = fileMapper.selectByPrimaryKey(id);
        System.out.println(file);
    }
}
