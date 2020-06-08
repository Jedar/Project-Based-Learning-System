import { Component, OnInit } from '@angular/core';
import * as echarts from "echarts";
import {ManagerService} from "../../../services/manager.service";
import {count} from "rxjs/operators";

@Component({
  selector: 'app-manager-project-chart',
  templateUrl: './manager-project-chart.component.html',
  styleUrls: ['./manager-project-chart.component.css']
})
export class ManagerProjectChartComponent implements OnInit {

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    var source = [];
    this.managerService.getProjectChartMessage().subscribe(result=>{
      if (result.code == 200){
        var title = ["学生数量","项目名称", "课程ID", "项目主题", "项目描述"];
        source.push(title);
        var data = result.data;
        for (var i = 0; i < data.length; i++){
          var temp = [
            data[i].studentNumberOfProject,
            data[i].projectName,
            data[i].courseId,
            data[i].theme,
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
            x: '项目名称'
          },
        },
      ]
    };
    // @ts-ignore
    echarts.init(document.getElementById('class-chart')).setOption(option);
      }
    });
  }

}
