export interface Project{
  projectId: number,
  projectName: string,
  theme: string,
  leaderId: number,
  startTime: string,
  endTime: string,
  scoreStartTime: string,
  scoreEndTime: string,
  description: string,
  courseId: number
}

export interface ProjectUpdateInfo {
  projectId: number,
  projectName: string,
  theme: string,
  leaderId: number,
  startTime: string,
  endTime: string,
  scoreStartTime: string,
  scoreEndTime: string,
  description: string,
  value1: number,
  value2: number,
  value3: number,
}

export interface ScoreDistribute{
  projectId: number,
  value1: number,
  value2: number,
  value3: number,
}

export interface ScoreDistributeMessage{
  code: number,
  message: string,
  data: ScoreDistribute,
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

