import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RuntimeService} from "../../../../../shared/runtime.service";
import {AlarmDetailComponent} from "../modals/alarm-detail/alarm-detail.component";
import {AlarmService} from "../../../../../shared/alarm.service";

@Component({
  selector: 'app-runtime-alarm-main',
  templateUrl: './runtime-alarm-main.component.html',
  styleUrls: ['./runtime-alarm-main.component.css']
})
export class RuntimeAlarmMainComponent implements OnInit {
  public uid;
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'ept_name';
  public value = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private modalService: NgbModal,
              private alarmService: AlarmService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.getList();
  }

  // 获取列表
  getList() {

    /*this.dataLists = [
      {
        name: 'aaaa'
      }
    ]*/

    this.loading = true;
    this.alarmService.getAlarm(this.uid, this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data.data;
        this.totalItems = data.count;
      }, err => {
        this.loading = false;
      });
  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getList();
    this.isAllChecked = false;
  }

  // 页码跳转
  goPage() {
    let totalPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.pageNum > totalPage) {
      return;
    }
    this.page = this.pageNum;
    this.pageChange();
  }

  // 搜索
  searchChange() {
    console.log(this.search);
    this.page = 1;
    this.pageChange();
  }
  searchEnter(event) {
    if (event.keyCode === 13) {
      this.searchChange();
    }
  }


  view(data) {
    // console.log(data);
    const modalRef = this.modalService.open(AlarmDetailComponent, {windowClass: 'modal_lg', centered: true});
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }



}
