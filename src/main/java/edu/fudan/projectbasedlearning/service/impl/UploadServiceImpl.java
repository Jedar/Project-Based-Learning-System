package edu.fudan.projectbasedlearning.service.impl;
import edu.fudan.projectbasedlearning.service.IUploadService;
import edu.fudan.projectbasedlearning.utils.FileNameUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * 文件上传
 */
@Service
public class UploadServiceImpl implements IUploadService {

    //支持的图片类型
    private static final List<String> IMAGE_CONTENT_TYPE = Arrays.asList("image/gif", "image/jpeg","image/png");
    //支持的文件类型
    private static final List<String> RESOURCE_CONTENT_TYPE = Arrays.asList(
            "text/csv","image/gif", "image/jpeg","image/png","text/html","application/pdf","text/plain","application/xml","application/zip"
    );

    // 文件的真实路径
    @Value("${file.uploadFolder}")
    private String realBasePath;
    @Value("${file.accessPath}")
    private String accessPath;

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public String uploadImage(MultipartFile file) {
        return handleFile(file,IMAGE_CONTENT_TYPE);
    }

    @Override
    public String uploadFile(MultipartFile file) {
        return handleFile(file,RESOURCE_CONTENT_TYPE);
    }

    private String handleFile(MultipartFile file,List<String> fileType){
        String newFileName = FileNameUtil.getFileName(file.getOriginalFilename());
//        System.out.println(file.getOriginalFilename());
//        System.out.println(newFileName);
        String contentType = file.getContentType();
        File dir = new File(realBasePath);
        if(!dir.exists()){
            dir.mkdirs();
        }
        if (!fileType.contains(contentType)) {
            logger.info("文件类型不合法:{}", newFileName);
            return null;
        }
        String path = realBasePath+newFileName;
        try {
//            BufferedInputStream read = new BufferedInputStream(file.getInputStream());
//            BufferedImage read = ImageIO.read(file.getInputStream());
//            if (read == null) {
//                logger.info("文件内容不合法:{}", newFileName);
//                return null;
//            }

            File dest = new File(path,"");
            System.out.println(dest.getParentFile());
            //判断文件父目录是否存在
            if(!dest.getParentFile().exists()){
                dest.getParentFile().mkdir();
            }

            file.transferTo(dest);
        } catch (IOException e) {
            logger.error("服务器内部错误->:{}", newFileName);
            e.printStackTrace();
        }//返回图片路径

        return accessPath+newFileName;
    }
}