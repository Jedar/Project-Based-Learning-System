export interface Score {
  projectId:number,
  userId:number,
  scoreType:number,
  distribute:number,
  value:number,
  time:string,
  comment:string,
}

export interface ScoreListMessage {
  code:number,
  message:string,
  data:Score[],
}
