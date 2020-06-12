import {Component, ElementRef, OnInit} from '@angular/core';

import {Discussion} from "../../../share/dicussion.model";
import {DiscussionService} from "../../../services/discussion.service";
import {ActivatedRoute} from "@angular/router";
import {Student} from "../../../share/student.model";
import {NzModalService} from "ng-zorro-antd/modal";
import {StudentService} from "../../../services/student.service";
import {HttpParams} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {TaskService} from "../../../services/task.service";


@Component({
  selector: 'app-pj-discuss',
  templateUrl: './pj-discuss.component.html',
  styleUrls: ['./pj-discuss.component.css']
})

export class PjDiscussComponent implements OnInit {
  projectId: number;
  userId: number;
  firstDiscussions: Discussion[] = [];
  discussions: Discussion[] = [];
  isShow: Map<string, boolean> = new Map<string, boolean>();
  discussionContent: string = "";
  replyContent: string;
  discussionChildren: Map<number, Discussion[]> = new Map<number, Discussion[]>();
  discussionAuthors: Map<number, string> = new Map<number, string>();

  myDiscussions:Discussion[] = [];

  pagination = {
    pageIndex: 1,
  };

  like(discussion_id: number): void {
    let like;
    for (let item of this.discussions){
      if (item.discussionId == discussion_id)like = item.likes;
    }
      const params = new HttpParams()
        .set("discussionId",String(discussion_id))
        .set("likes",like+1);
      this.discussionService.updateLike(params).subscribe(result=>{
        if(result.code == 200){
         this.init();
        }
      });
  }

  showReply(discussion_id: number): void {
    let s = ".ReplyController" + discussion_id;
    if (!this.isShow.has(s) || !this.isShow.get(s)) {
      this.el.nativeElement.querySelector(s).style.display = "block";
      this.isShow.set(s, true);
    } else {
      this.el.nativeElement.querySelector(s).style.display = "none";
      this.isShow.set(s, false);
    }
  }

  getAuthor(author_id: number): string {
    return this.discussionAuthors.get(author_id);
  }

  constructor(
    private discussionService: DiscussionService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private taskService: TaskService,
    private modal: NzModalService,
    private el: ElementRef,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = taskService.getProjectId();
      this.userId = authService.getUserId();
    });
  }

  init(){
    this.discussionService.getAllDiscussionList(this.projectId).subscribe(result => {
      this.discussions = result.data;
      for (let discussion of this.discussions) {
        this.discussionService.getDiscussionChildren(discussion.discussionId,this.projectId).subscribe(res => {
          if (res.data != null) this.discussionChildren.set(discussion.discussionId, res.data);
          for (let item of this.discussionChildren.get(discussion.discussionId))item.time = item.time.substr(0,10);
        });

        this.discussionService.getAuthorOfDiscussion(discussion.userId).subscribe(author => {
            this.discussionAuthors.set(discussion.userId, author.data.username);
          }
        )
      }
    });

    this.discussionService.getFirstDiscussionList(this.projectId).subscribe(result => {
      this.firstDiscussions = result.data;
      for (let item of this.firstDiscussions)item.time = item.time.substr(0,10);
    });

    this.discussionService.getMyDiscussion(this.projectId,this.userId).subscribe(result=>{
      this.myDiscussions = result.data;
      console.log(this.myDiscussions);
    });
  }

  ngOnInit(): void {
   this.init();
   console.log(this.myDiscussions);
  }


  getAllDiscussion(){
    return this.firstDiscussions;
  }

  publish() {
    if (this.discussionContent.length <= 0) {
      this.modal.error({
        nzTitle: '发布失败',
        nzContent: "发布内容不能为空",
      });
      return;
    }

    const params = new HttpParams()
      .set('projectId', String(this.projectId))
      .set('content', this.discussionContent)
      .set('likes', String(0))
      .set('userId', String(this.userId));

    this.discussionService.publishDiscussion(params).subscribe(result => {
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '发布讨论',
          nzContent: '发布成功',
          nzOnOk: () => {this.init();}
        });
      } else {
        this.modal.error({
          nzTitle: '发布失败',
          nzContent: result.message,
        });
      }
    })
  }

  reply(parent_id: number) {

    if (this.replyContent.length <= 0) {
      this.modal.error({
        nzTitle: '回复失败',
        nzContent: "回复内容不能为空",
      });
      return;
    }

    const params = new HttpParams()
      .set('projectId', String(this.projectId))
      .set('content', this.replyContent)
      .set('likes', String(0))
      .set('userId', String(this.userId))
      .set('parentsId', String(parent_id));

    this.discussionService.replyDiscussion(params).subscribe(result => {
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '回复讨论',
          nzContent: '回复成功',
          nzOnOk: () => {this.init();}
        });
      } else {
        this.modal.error({
          nzTitle: '回复失败',
          nzContent: result.message,
        });
      }
    })
  }
}
