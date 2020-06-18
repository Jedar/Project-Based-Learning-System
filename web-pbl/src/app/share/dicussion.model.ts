export interface Discussion {
  discussionId: number,
  projectId: number,
  content: string,
  time: string,
  userId: number,
  likes: number,
  parentsId: number,
}

export interface DiscussionListMessage {
  code: number,
  message: string,
  data: Discussion[],
}

export interface DiscussionCountMessage {
  code:number,
  message:string,
  data:number,
}

export interface Author {
  userId:number,
  username:string,
  gender:string,
  profile:string,
}
export interface AuthorMessage {
  code:number,
  message:string,
  data:Author,
}
