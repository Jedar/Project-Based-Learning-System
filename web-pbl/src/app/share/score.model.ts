export interface Score {
  projectId:number,
  userId:number,
  scoreType:number,
  distribute:number,
  value:number,
  time:string,
  scorerId:number,
  comment:string,
}

export interface ScoreListMessage {
  code:number,
  message:string,
  data:Score[],
}

export interface StudentScore {
  sId:number,
  username:string,
  gender:string,
  school:string,
  profile:string,
  comment:string,
  value:number,
}

export interface StudentScoreListMessage {
  code:number,
  message:string,
  data:StudentScore[],
}
