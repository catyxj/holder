import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../../../shared/service.service";

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrls: ['./service-dashboard.component.css']
})
export class ServiceDashboardComponent implements OnInit {

  public classifies = []; // 显示分类
  public cPage = 1;
  public cTotalItems = 0;
  public cPageSize = 4;
  public cTotalPage = 0;
  public dataList = []; // 所有分类
  // public currentType = {};

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.dataList = [
      {
        TypeId: 1,
        Name: 'A类问题'
      },
      {
        TypeId: 2,
        Name: 'B类问题'
      },
      {
        TypeId: 3,
        Name: 'C类问题'
      },
      {
        TypeId: 4,
        Name: 'D类问题'
      },
      {
        TypeId: 5,
        Name: 'E类问题'
      },
      {
        TypeId: 6,
        Name: 'F类问题'
      }
    ];
    this.cTotalItems = this.dataList.length;
    this.cTotalPage = Math.ceil(this.cTotalItems / this.cPageSize);
    // this.currentType = this.dataList[0];
    this.refreshType();

    // this.getType();
  }

  getType() {
    this.serviceService.getType()
      .subscribe(data => {
        this.dataList = data;
        this.cTotalItems = this.dataList.length;
        this.cTotalPage = Math.ceil(this.cTotalItems / this.cPageSize);
        this.refreshType();
      }, err => {

      });
  }

  /*changeType(data) {
    this.currentType = data;
  }*/

  refreshType() {
    this.classifies = this.dataList.slice((this.cPage - 1) * 4, (this.cPage - 1) * 4 + 4);
  }


  prePage() {
    this.cPage--;
    this.refreshType();
  }

  nextPage() {
    this.cPage++;
    this.refreshType();
  }

}
