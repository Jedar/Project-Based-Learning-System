export interface FileResourse{
    file_id:number,
    project_id:number,
    file_name:string,
    path:string,
    username:string,
    time:string,
}

export interface FileListMessage{
    code:number,
    message:string,
    data:FileResourse[]
}

export interface FileUpload{
    projectId:number,
    fileName:string,
    path:string,
    userId:number,
}


