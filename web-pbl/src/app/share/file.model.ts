export interface FileResourse{
    file_id:number,
    project_id:number,
    file_name:string,
    path:string,
    uploader:string,
    upload_time:string,
}

export interface FileListMessage{
    code:number,
    message:string,
    data:FileResourse[]
}

export interface FileUpload{
    project_id:number,
    file_name:string,
    path:string,
}


