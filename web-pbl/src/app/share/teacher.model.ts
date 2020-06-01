export interface Teacher{
  tId:number,
  username:string,
  gender:string,
  school:string,
  profile:string
}
export interface TeacherListMessage {
  code:number,
  message: string,
  data: Teacher[]
}
export interface TeacherMessage {
  code:number,
  message: string,
  data: Teacher
}

