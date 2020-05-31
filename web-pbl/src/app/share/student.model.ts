export interface Student{
    tId:number,
    username:string,
    gender:string,
    school:string,
    profile:string
}
export interface StudentListMessage {
  code:number,
  message: string,
  data: Student[]
}
export interface StudentMessage {
  code:number,
  message: string,
  data: Student
}

