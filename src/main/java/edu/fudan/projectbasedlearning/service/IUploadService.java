package edu.fudan.projectbasedlearning.service;

import org.springframework.web.multipart.MultipartFile;

public interface IUploadService {
    public String uploadImage(MultipartFile file) ;

    public String uploadFile(MultipartFile file);
}
