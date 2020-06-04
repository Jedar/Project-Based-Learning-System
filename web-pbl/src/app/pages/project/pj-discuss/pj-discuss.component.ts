import {Component, OnInit} from '@angular/core';

import {Discussion} from "../../../share/dicussion.model";
import {DiscussionService} from "../../../services/discussion.service";
import {ActivatedRoute} from "@angular/router";
import {Student} from "../../../share/student.model";
import {ElementRef} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {StudentService} from "../../../services/student.service";
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-pj-discuss',
  templateUrl: './pj-discuss.component.html',
  styleUrls: ['./pj-discuss.component.css']
})
export class PjDiscussComponent implements OnInit {
  projectId: number;
  userId:number;
  discussions: Discussion[] = [];
  isShow: Map<string,boolean> = new Map<string, boolean>();
  discussionContent: string = "";
  replyContent:string;
  discussionChildren: Map<number, Discussion[]> = new Map<number, Discussion[]>();
  discussionAuthors:Map<number,Student> = new Map<number, Student>();

  like(discussion_id: number): void {
    for (let items of this.discussions) {
      if (items.discussionId == discussion_id) {
        items.likes++;
      }
      for (let child of this.discussionChildren.get(items.discussionId)) {
        if (child.discussionId == discussion_id) {
          child.likes++;
        }
      }
    }

  }

  showReply(discussion_id: number): void {
    let s = ".ReplyController" + discussion_id;
    if (!this.isShow.has(s) || !this.isShow.get(s)) {
      this.el.nativeElement.querySelector(s).style.display = "block";
      this.isShow.set(s,true);
    } else {
      this.el.nativeElement.querySelector(s).style.display = "none";
      this.isShow.set(s,false);
    }
  }

  getAuthor(author_id: number) {
    return this.discussionAuthors.get(author_id).username;
  }

  constructor(
    private discussionService: DiscussionService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private el: ElementRef,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.userId = params['userId'];
    });
  }

  ngOnInit(): void {
    this.discussionService.getDiscussionList(this.projectId).subscribe(result => {
      this.discussions = result.data;
      for (let discussion of this.discussions) {

        this.discussionService.getDiscussionChildren(discussion.discussionId).subscribe(res => {
              this.discussionChildren.set(discussion.discussionId,res.data);

              for(let child of res.data){
                this.discussionService.getAuthorOfDiscussion(child.userId).subscribe(author=>{
                  this.discussionAuthors.set(child.userId,author.data);
                })
              }
        });

        this.discussionService.getAuthorOfDiscussion(discussion.userId).subscribe(author=>{
          this.discussionAuthors.set(discussion.userId,author.data);
          }
        )
      }
    });

  }

  publish() {
    if (this.discussionContent.length <= 0) {
      this.modal.error({
        nzTitle: '发布失败',
        nzContent: "发布内容不能为空",
      });
      return;
    }

    this.projectId = 1;
    this.userId = 10009;
    const params = new HttpParams()
      .set('projectId',String(this.projectId))
      .set('content',this.discussionContent)
      .set('likes',String(0))
      .set('userId',String(this.userId));

    this.discussionService.publishDiscussion(params).subscribe(result => {
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '发布讨论',
          nzContent: '发布成功',
        })
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

    this.projectId = 1;
    this.userId = 10009;
    const params = new HttpParams()
      .set('projectId',String(this.projectId))
      .set('content',this.replyContent)
      .set('likes',String(0))
      .set('userId',String(this.userId))
      .set('parentsId',String(parent_id));

    this.discussionService.replyDiscussion(params).subscribe(result => {
      if (result.code == 200) {
        this.modal.success({
          nzTitle: '回复讨论',
          nzContent: '回复成功',
        })
      } else {
        this.modal.error({
          nzTitle: '回复失败',
          nzContent: result.message,
        });
      }
    })
  }
}
