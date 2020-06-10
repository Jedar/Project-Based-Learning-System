package edu.fudan.projectbasedlearning.core;

/**
 * 响应结果生成工具
 */
public class ResultTypeGenerator<T> {
    private static final String DEFAULT_SUCCESS_MESSAGE = "SUCCESS";

    public Result<T> genSuccessResult() {
        return new Result<T>()
                .setCode(ResultCode.SUCCESS)
                .setMessage(DEFAULT_SUCCESS_MESSAGE);
    }

    public Result<T> genSuccessResult(T data) {
        return new Result<T>()
                .setCode(ResultCode.SUCCESS)
                .setMessage(DEFAULT_SUCCESS_MESSAGE)
                .setData(data);
    }

    public Result<T> genSuccessResult(String token,T data) {
        return new Result<T>()
                .setCode(ResultCode.SUCCESS)
                .setMessage(token)
                .setData(data);
    }

    public Result<T> genFailResult(String message) {
        return new Result<T>()
                .setCode(ResultCode.FAIL)
                .setMessage(message);
    }
}
