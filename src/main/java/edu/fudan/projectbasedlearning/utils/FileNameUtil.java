package edu.fudan.projectbasedlearning.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class FileNameUtil {
    /**
     * 获取文件后缀
     * @param fileName
     * @return
     */
    public static String getSuffix(String fileName){
        return fileName.substring(fileName.lastIndexOf("."));
    }

    /**
     * 生成新的文件名
     * @param fileOriginName 源文件名
     * @return
     */
    public static String getFileName(String fileOriginName){
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        String dir = formatter.format(new Date(System.currentTimeMillis()));
        String fileName = UUID.randomUUID().toString().substring(0,10).replace("-", "") + getSuffix(fileOriginName);
        return dir+"/"+fileName;
    }
}
