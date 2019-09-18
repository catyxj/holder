import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BoilerService} from "../../../../shared/boiler.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EqListAddComponent} from "../../monitor/list/modals/eq-list-add/eq-list-add.component";

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {
  public roleId;
  public monitor;
  public reminds = [];
  public notice = [];

  constructor(private router: Router,
              private eptService: BoilerService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');

    this.getMonitor();
    this.getRemind();
    this.getNotice();
  }

  // 获取监控数量
  getMonitor() {
    this.eptService.getMonitor()
      .subscribe(data => {
        this.monitor = data;
      });
  }

  // 获取重要提醒
  getRemind() {
    this.reminds = [
      {
        created_at: '2018-2-13 12:12:12',
        info: 'XXXXX锅炉运行周报',
        log_type: 1,
        is_read: false,
        log_status: true
      },
      {
        created_at: '2018-2-13 12:12:12',
        info: 'XXXXX锅炉运行周报',
        log_type: 2,
        is_read: true,
        log_status: false
      },
      {
        created_at: '2018-2-13 12:12:12',
        info: 'XXXXX锅炉运行周报',
        log_type: 3,
        is_read: true,
        log_status: false
      },
      {
        created_at: '2018-2-13 12:12:12',
        info: 'XXXXX锅炉运行周报',
        log_type: 4,
        is_read: true,
        log_status: false
      }
    ];

    /*this.eptService.getRemind()
      .subscribe(data => {
        this.reminds = data;
      }, err => {

      });*/
  }

  // 获取通知消息
  getNotice() {
    /*this.notice = [
      {
        created_at: '2018-2-13 12:12:12',
        info: 'XXXXX锅炉运行周报',
        log_type: 1, // 1设备上下线，2设备故障，3设备告警
        is_read: false
      },
      {
        created_at: '2018-2-13 12:12:12',
        info: 'XXXXX锅炉运行周报',
        log_type: 2,
        is_read: true
      }
    ];*/

    this.eptService.getNotice()
      .subscribe(data => {
        this.notice = data.data;
      }, err => {

      });
  }


  // 关联设备
  addTerm() {
    let that = this;
    const modalRef = this.modalService.open(EqListAddComponent, {windowClass: 'modal_md', centered: true});
    // modalRef.componentInstance.currentData = this.config;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.router.navigate(['/admin/formal/terminal/list']);
      }
    }, (reason) => {
      console.log(reason);
    });
  }




}
