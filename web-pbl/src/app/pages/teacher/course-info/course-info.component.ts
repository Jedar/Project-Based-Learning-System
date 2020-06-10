import {Component, OnInit} from '@angular/core';
import {Course, CourseStudentChart} from "../../../share/course.model";
import {CourseService} from "../../../services/course.service";
import * as echarts from "echarts";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css'],
  inputs: ['courseId'],
})
export class CourseInfoComponent implements OnInit {

  courseId;
  course: Course;

  chart: CourseStudentChart;

  constructor(
    private courseService: CourseService
  ) {
  }

  getCourseInfo(): void {
    this.courseService.getCourseInfo(this.courseId)
      .subscribe(result => {
        this.course = result.data;
      })
  }

  getCourseChart(): void {
    this.courseService.getCourseStudentChart(this.courseId)
      .subscribe(result => {
        this.chart = result.data;

        console.log(this.chart);

        var schools = [];
        for(var i = 0; i < this.chart.school.length; i++){
          schools.push(this.chart.school[i].name)
        }

        var genders = [];
        for(var i = 0; i < this.chart.gender.length; i++){
          genders.push(this.chart.gender[i].name)
        }

        var schoolOption = {
          title: {
            text: '选课学生学校分布情况'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            top: 30,
            orient: 'vertical',
            left: 10,
            data: schools
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              data: this.chart.school
            }
          ]
        };
        var genderOption = {
          title: {
            text: '选课学生性别分布情况'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            top: 30,
            orient: 'vertical',
            left: 10,
            data: genders
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              data: this.chart.gender
            }
          ]
        };
        // @ts-ignore
        echarts.init(document.getElementById('schoolChart')).setOption(schoolOption);
        // @ts-ignore
        echarts.init(document.getElementById('genderChart')).setOption(genderOption);
      });
  }

  ngOnInit(): void {
    this.getCourseInfo();
    this.getCourseChart();
  }

}
