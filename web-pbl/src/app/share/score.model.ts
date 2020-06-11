export interface Score {
  projectId:number,
  userId:number,
  scoreType:number,
  distribute:number,
  value:number,
  time:string,
  scorer_id:number,
  comment:string,
}

export interface ScoreListMessage {
  code:number,
  message:string,
  data:Score[],
}
