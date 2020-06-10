package edu.fudan.projectbasedlearning.controller;

import edu.fudan.projectbasedlearning.core.Result;
import edu.fudan.projectbasedlearning.core.ResultGenerator;
import edu.fudan.projectbasedlearning.core.ResultTypeGenerator;
import edu.fudan.projectbasedlearning.service.IUploadService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Api(value = "文件上传相关接口",tags = "文件上传相关接口")
public class UploadController {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Resource
    IUploadService uploadService;

    @ApiOperation(value = "上传图片")
    @RequestMapping(value = "/image/upload", method = RequestMethod.POST)
    public Result<String> uploadImage(
            @RequestParam(value = "upload_file") MultipartFile file) {
        ResultTypeGenerator<String> generator = new ResultTypeGenerator<>();
        Map<String, String> map = new HashMap<>() ;
        String path=uploadService.uploadImage(file);

        if(path == null){
            logger.info("图片上传失败");
            return generator.genFailResult("图片上传失败");
        }
        return generator.genSuccessResult(path);
    }

    @ApiOperation(value = "上传文件")
    @RequestMapping(value = "/file/upload", method = RequestMethod.POST)
    public Result<String> uploadFile(
            @RequestParam(value = "upload_file") MultipartFile file) {
        ResultTypeGenerator<String> generator = new ResultTypeGenerator<>();
        Map<String, String> map = new HashMap<>() ;
        String path=uploadService.uploadFile(file);

        if(path == null){
            logger.info("文件上传失败");
            return generator.genFailResult("文件上传失败");
        }
        return generator.genSuccessResult(path);
    }
}
