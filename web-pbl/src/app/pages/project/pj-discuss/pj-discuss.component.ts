import {Component, OnInit} from '@angular/core';

import {Discussion} from "../../../share/dicussion.model";
import {DiscussionService} from "../../../services/discussion.service";
import {ActivatedRoute} from "@angular/router";
import {Student} from "../../../share/student.model";
import {ElementRef} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";


@Component({
  selector: 'app-pj-discuss',
  templateUrl: './pj-discuss.component.html',
  styleUrls: ['./pj-discuss.component.css']
})
export class PjDiscussComponent implements OnInit {
  projectId: number;
  discussions: Discussion[] = [];
  authors: Student[] = [];
  isShow: boolean = true;
  discussionContent: string;
  replyContent:string;
  discussionChildren: Map<number, Discussion[]> = new Map<number, Discussion[]>();

  like(discussion_id: number): void {
    for (let items of this.discussions) {
      if (items.discussion_id == discussion_id) {
        items.likes++;
      }
      for (let child of this.discussionChildren.get(items.discussion_id)) {
        if (child.discussion_id == discussion_id) {
          child.likes++;
        }
      }
    }

  }

  showReply(discussion_id: number): void {
    let s = ".ReplyController" + discussion_id;
    if (this.isShow) {
      this.el.nativeElement.querySelector(s).style.display = "block";
    } else {
      this.el.nativeElement.querySelector(s).style.display = "none";
    }
    this.isShow = !this.isShow;
  }

  getAuthor(author_id: number): string {
    for (let item of this.authors) {
      if (item.user_id == author_id) {
        return item.user_name;
      }
    }
  }

  constructor(
    private discussionService: DiscussionService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private el: ElementRef,
  ) {
    activatedRoute.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.discussionService.getDiscussionList(this.projectId).subscribe(result => {
      this.discussions = result;
      for (let discussion of this.discussions) {
        this.discussionService.getDiscussionChildren(discussion.discussion_id).subscribe(res => {
              this.discussionChildren.set(discussion.discussion_id,res);
        });
      }
    });

    this.discussionService.getAuthorsOfDiscussions().subscribe(result => {
      this.authors = result;
    })

  }

  publish() {
    if (this.discussionContent.length <= 0) {
      this.modal.error({
        nzTitle: '发布失败',
        nzContent: "发布内容不能为空",
      });
      return;
    }
    this.discussionService.publishDiscussion().subscribe(result => {
      if (result.state == "true") {
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
    this.discussionService.replyDiscussion().subscribe(result => {
      if (result.state == "true") {
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
