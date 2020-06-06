export interface Task{
    task_id:number,
    task_name:string,
    project_id:number,
    username:string,
    start_time:string,
    end_time:string,
    content:string,
    state:number,
    comment:string,
    priority:number,
}

export interface TaskInfoMessage{
    "code":number,
    "message":string,
    "data":Task,
}

export interface TaskListMessage{
    "code":number,
    "message":string,
    "data":Task[]
}


export interface EditTaskMessage{
    projectId:number,
    taskId:number,
    state:number,
    comment:string,
}

/* Post structure */
export interface TaskMessage{
    taskId:number,
    taskName:string,
    projectId:number,
    userId:number,
    startTime:string,
    endTime:string,
    content:string,
    state:number,
    comment:string,
    priority:number,
}
