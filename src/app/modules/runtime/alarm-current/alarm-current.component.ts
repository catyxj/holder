import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlarmService} from "../../../shared/alarm.service";
import {AlarmDetailComponent} from "../../alarm/alarm-detail/alarm-detail.component";


@Component({
  selector: 'app-alarm-current',
  templateUrl: './alarm-current.component.html',
  styleUrls: ['./alarm-current.component.css']
})
export class AlarmCurrentComponent implements OnInit {

  public alarms = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public pageSize = 10;
  public uid;

  constructor(private modalService: NgbModal,
              private alarmService: AlarmService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.getalarms();
  }

  // 获取告警列表
  getalarms() {
    this.alarmService.getCurrents(this.page, this.pageSize, this.search, this.uid)
      .subscribe( data => {
        this.alarms = data.params;
        this.totalItems = data.counts;
      });
  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getalarms();
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  view(data) {
    console.log(data);
    const modalRef = this.modalService.open(AlarmDetailComponent, {size: 'lg'});
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
