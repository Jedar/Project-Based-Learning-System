package edu.fudan.projectbasedlearning.service;

import org.springframework.web.multipart.MultipartFile;

public interface IUploadService {
    // 上传图片
    public String uploadImage(MultipartFile file) ;

    // 上传文件
    public String uploadFile(MultipartFile file);
}
