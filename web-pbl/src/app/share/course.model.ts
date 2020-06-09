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

export interface TeacherCourse {
  courseId: number,
  courseName: string,
  description: string,
  maxStudentNumber: number,
  picture: string
}

export interface TeacherCourseListMessage {
  code: number,
  message: string,
  data: TeacherCourse[]
}
export interface CourseChart {
  course_id: number,
  teacher_name: string,
  course_name: string,
  description: string,
  studentNumberOfCourse: number
}
export interface CourseChartMessage {
  code: number,
  message: string,
  data: CourseChart[]
}
export interface ProjectChart {
  studentNumberOfProject: number,
  projectId: number,
  courseId: number,
  projectName: string,
  theme: string,
  description: string
}
export interface ProjectChartMessage {
  code: number,
  message: string,
  data: ProjectChart[]
}
