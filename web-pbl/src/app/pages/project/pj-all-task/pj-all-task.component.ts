import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { Task } from '../../../share/task.model';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute,Router } from '@angular/router';

interface GanttTask{
  'pID': number,
  'pName': string,
  'pStart': string,
  'pEnd': string,
  'pClass': string,
  'pLink': string,
  'pMile': number,
  'pRes': string,
  'pComp': number,
  'pGroup': number,
  'pParent': number,
  'pOpen': number,
  'pDepend': string,
  'pCaption': string,
  'pNotes': string,
  'pTaskUser':string,
  'pTime':string,
  'pPriority':number,
}

const TASK_COLORS:string[] = [
  'gtaskblue','gtaskred','gtaskyellow','gtaskpurple','gtaskgreen','gtaskpink'
];

const GROUP_COLORS:string[] = [
  'ggroupblack',
];

const BLOCK_COLORS:string[] = [
  'gmilestone',
];

@Component({
  selector: 'app-pj-all-task',
  templateUrl: './pj-all-task.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./pj-all-task.component.css']
})
export class PjAllTaskComponent implements OnInit {
  @ViewChild('editor') editor: GanttEditorComponent;
  public editorOptions: GanttEditorOptions;
  public data: any;
  /* 中文简体 */
  vLang = 'cn'
  public tasks:Task[] = [];

  projectId:number;

  public listOfColumn = [
    {
      title: '任务名称',
    },
    {
      title: '负责人',
      compare: (a: Task, b: Task) => a.username.localeCompare(b.username),
      priority: 1
    },
    {
      title: '开始时间',
      compare: (a: Task, b: Task) => a.start_time.localeCompare(b.start_time),
      priority: 2
    },
    {
      title: '结束时间',
      compare: (a: Task, b: Task) => a.end_time.localeCompare(b.end_time),
      priority: 4
    },
    {
      title: '任务优先级',
      compare: (a: Task, b: Task) => a.priority > b.priority,
      priority: 5
    },
    {
      title: '任务进度',
      compare: (a: Task, b: Task) => a.state - b.state,
      priority: 3
    },
    {
      title: '任务描述',
    },
  ]

  constructor(
    public fb: FormBuilder,
    private taskService:TaskService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    ){
      // activatedRoute.queryParams.subscribe(params => {
      //   this.projectId = Number(params['projectId']);
      // });
      this.projectId = taskService.getProjectId();
  }

  ngOnInit(){
    /* 额外的属性 */
    const vAdditionalHeaders = {
      pTaskUser: {
        title: '负责人'
      },
      pTime: {
        title: '持续时间'
      },
      pPriority: {
        title: '优先级'
      }
    };
    this.taskService.getTaskList(this.projectId).subscribe(result=>{
      if(result.code != 200){
        window.alert(result.message);
        return;
      }
      console.log(result.data);
      this.tasks = result.data;
      this.data = this.turnTaskToGanttTask(result.data);
      this.editor.setOptions(this.editorOptions);
    });
    this.data = this.turnTaskToGanttTask(this.tasks);
    this.editorOptions = {
      vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
      vQuarterColWidth: 200,
      vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
      vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
      vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
      vLang: this.vLang,
      vUseSingleCell: '0',
      vShowRes: 0,
      vShowCost: 0,
      vShowComp: 0,
      vShowDur: 0,
      vShowStartDate: 0,
      vShowEndDate: 0,
      vShowPlanStartDate: 0,
      vShowPlanEndDate: 0,
      vShowTaskInfoLink: 0, // Show link in tool tip (0/1)
      // Show/Hide the date for the last day of the week in header for daily view (1/0)
      vShowEndWeekDate: 0,
      vAdditionalHeaders: vAdditionalHeaders,
      vResources: [
        // { id: 0, name: 'Anybody' },
        // { id: 1, name: 'Mario' },
        // { id: 2, name: 'Henrique' },
        // { id: 3, name: 'Pedro' }
      ],
      vTooltipTemplate: this.getToolTip,
      vEventClickRow: console.log,
      vTooltipDelay: 150,
      vDebug: false,
      vEditable: false,
      vUseSort: false,
      vUseFade:true,
      vFormatArr: ['Day', 'Week', 'Month', 'Quarter'],
      vFormat: 'day'
    };
    // this.editorOptions = {
    //   vFormat: 'day'
    // }
    
  }

  action(){
    console.log(this.editor.format);
  }

  turnTaskToGanttTask(list:Task[]):GanttTask[]{
    let data:GanttTask[] = [];
    for(let item of list){
      data.push({
        'pID': item.task_id,
        'pName': item.task_name,
        'pStart': item.start_time,
        'pEnd': item.end_time,
        'pClass': this.randomColor(),
        'pLink': '',
        'pMile': 0,
        'pRes': item.username,
        'pComp': item.state,
        'pGroup': 0,
        'pParent': 0,
        'pOpen': 1,
        'pDepend': '',
        'pCaption': '',
        'pNotes': item.content,
        'pTaskUser':item.username,
        'pTime':this.getTime(item.start_time,item.end_time)+"天",
        'pPriority':item.priority,
      });
    }
    console.log(data)
    return data;
  }

  randomColor():string{
    let len = TASK_COLORS.length;
    let index:number = Math.floor(Math.random()*len);
    return TASK_COLORS[index];
  }

  getTime(val1:string,val2:string):number{
    let v1 = Date.parse(val1);
    let v2 = Date.parse(val2);
    let dateTime = 1000*60*60*24;
    let minusDays = Math.abs(Math.floor(((v2-v1)/dateTime)));
    return minusDays;
  }

  getToolTip(task:any,index):string{
    let item = task;
    return `
    <div>
      <span class="gTtTitle">{{pName}}</span>
      <div class="gTILine gTIsd">
      <span class="gTaskLabel">起始日期: </span>
      <span class="gTaskText">${(<Date>task.getStart()).toDateString()}</span>
      </div>
    <div class="gTILine gTIed">
      <span class="gTaskLabel">截止日期: </span>
      <span class="gTaskText">${(<Date>task.getEnd()).toDateString()}</span>
    </div>
    <div class="gTILine gTIc">
      <span class="gTaskLabel">进度：</span>
      <span class="gTaskText">{{pComp}}%</span>
    </div>
    <div class="gTILine gTIr">
      <span class="gTaskLabel">负责人：</span>
      <span class="gTaskText">{{pRes}}</span>
    </div>
    <div class="gTILine gTIn">
      <span class="gTaskLabel">描述</span>
      <span class="gTaskNotes">${task.getNotes().innerHTML}</span>
    </div>
    </div>
    `
    return "Hello";
  }
}
