import { Component, OnInit } from '@angular/core';
import {AlarmService} from "../../../shared/alarm.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlarmDetailComponent} from "../alarm-detail/alarm-detail.component";

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  public alarms = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public pageSize = 10;
  private uid;

  constructor(private modalService: NgbModal,
              private alarmService: AlarmService) { }

  ngOnInit() {
    let uid = sessionStorage.getItem('runtimeUid');
    if (uid) {
      this.uid = uid;
    }
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
    // console.log(data);

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
