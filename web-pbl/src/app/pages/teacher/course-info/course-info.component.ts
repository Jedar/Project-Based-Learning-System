import {Component, OnInit} from '@angular/core';
import {Course, CourseStudentChart, item} from "../../../share/course.model";
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

  constructor(
    private courseService: CourseService
  ) {
  }

  getCourseInfo(): void {
    this.courseService.getCourseInfo(this.courseId)
      .subscribe(result => {
        if(result.code === 200){
          this.course = result.data;
        }
      })
  }

  genSchoolChart(schools: item[]): void {
    var schoolsNames = [];
    for(var i = 0; i < schools.length; i++){
      schoolsNames.push(schools[i].name)
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
        data: schoolsNames
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
          data: schools
        }
      ]
    };

    // @ts-ignore
    echarts.init(document.getElementById('schoolChart')).setOption(schoolOption);
  }

  genGenderChart(genders: item[]): void {

    var genderNames = [];
    for(var i = 0; i < genders.length; i++){
      genderNames.push(genders[i].name)
    }
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
        data: genderNames
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
          data: genders
        }
      ]
    };

    // @ts-ignore
    echarts.init(document.getElementById('genderChart')).setOption(genderOption);
  }

  getCourseChart(): void {
    this.courseService.getCourseStudentChart(this.courseId)
      .subscribe(result => {
        if(result.code === 200){
          this.genSchoolChart(result.data.school);
          this.genGenderChart(result.data.gender);
        }
      });
  }

  ngOnInit(): void {
    this.getCourseInfo();
    this.getCourseChart();
  }

}
