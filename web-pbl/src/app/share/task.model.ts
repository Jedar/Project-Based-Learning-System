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
}

export interface TaskListMessage{
    "code":number,
    "message":string,
    "data":Task[]
}


export interface EditTaskMessage{
    project_id:number,
    task_id:number,
    state:number,
    comment:string,
}

/* Post structure */
export interface TaskMessage{
    task_id:number,
    task_name:string,
    project_id:number,
    user_id:number,
    start_time:string,
    end_time:string,
    content:string,
}
