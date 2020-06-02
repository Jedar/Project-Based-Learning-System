export interface Project{
  projectId: number,
  projectName: string,
  theme: string,
  leaderId: number,
  startTime: string,
  endTime: string,
  description: string,
  courseId: number
}

export interface ProjectListMessage {
  code: number,
  message: string,
  data: Project[]
}
export interface ProjectMessage {
  code: number,
  message: string,
  data: Project
}

