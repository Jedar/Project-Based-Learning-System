export interface Result{
    state:string,
    message:string
}

export interface User{
    user_id:number,
    username:string,
    role:number,
}
export interface UserOfTeacher {
  t_id: number,
  username: string,
  gender: string,
  school: string
}

export interface UserOfStudent {
  s_id: number,
  username: string,
  gender: string,
  school: string
}



export interface UniqueUsername {
    result:boolean
}
