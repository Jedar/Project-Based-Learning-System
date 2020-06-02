export interface Course{
  course_id: number,
  teacher_id: number,
  teacher_name: string,
  course_name: string,
  description: string,
  max_student_number: number,
  picture: string
}

export interface CourseListMessage {
  code: number,
  message: string,
  data: Course[]
}
export interface CourseMessage {
  code: number,
  message: string,
  data: Course
}
