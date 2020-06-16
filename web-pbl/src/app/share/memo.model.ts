export interface Memo{
    memoId:number;
    read:number;
    sendId:number;
    recvId:number;
    message:string;
    taskId:number;
}

export interface MemoMessage{
    memoId:number;
    read:number;
    sendId:number;
    recvId:number;
    message:string;
    taskId:number;
    sendName:string;
    sendRole:number;
    projectId:number;
    projectName:string;
}

export interface MemoResult{
    code : number;
    message : string;
    data : MemoMessage[];
}

export interface MemoCount{
    code : number;
    message : string;
    data : number;
}
