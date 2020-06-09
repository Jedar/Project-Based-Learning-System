import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts';
import {ManagerService} from "../../../services/manager.service";



@Component({
  selector: 'app-manager-class-chart',
  templateUrl: './manager-class-chart.component.html',
  styleUrls: ['./manager-class-chart.component.css']
})

export class ManagerClassChartComponent implements OnInit {

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    var source = [];
    this.managerService.getCourseChartMessage().subscribe(result=>{
      if (result.code == 200){
        var title = ["学生数量","课程名称", "授课老师", "课程描述"];
        source.push(title);
        var data = result.data;
        for (var i = 0; i < data.length; i++){
          var temp = [
            data[i].studentNumberOfCourse,
            data[i].course_name,
            data[i].teacher_name,
            data[i].description
          ];
          source.push(temp);
        }
        var option = {
          tooltip: {

          },
          dataset: {
            source: source
          },
          grid: {containLabel: true},
          yAxis: {},
          xAxis: {type: 'category'},
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                y: '学生数量',
                // Map the "product" column to Y axis
                x: '课程名称'
              }
            }
          ]
        };
        // @ts-ignore
        echarts.init(document.getElementById('class-chart')).setOption(option);
      }
    });
  }

}
