import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoilerService} from "../../../../../shared/boiler.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {EqListAddComponent} from "../../list/modals/eq-list-add/eq-list-add.component";
import {BoilerSocketService} from "../../../../../shared/boiler-socket.service";

import Swal from 'sweetalert2';
import {EqListLinkComponent} from "../../list/modals/eq-list-link/eq-list-link.component";

@Component({
  selector: 'app-graphic-dashboard',
  templateUrl: './graphic-dashboard.component.html',
  styleUrls: ['./graphic-dashboard.component.css']
})
export class GraphicDashboardComponent implements OnInit, OnDestroy {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 4;
  public search = 'name';
  public value;
  public status = '';
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  public socket: any;
  public run = '';
  private token;
  public roleId;

  constructor(private modalService: NgbModal,
              private eptService: BoilerService,
              private boilerWsService: BoilerSocketService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    this.token = localStorage.getItem('authToken');
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.page = parseInt(params.get('page'));
        if (!this.page) {
          this.page = 1;
        }
        this.getList();
        return (params.get('page') || []);
      })
    ).subscribe();
  }



  sendMessage(message) {
    this.boilerWsService.sendMessage(message);
  }

  // 获取列表
  getList() {
    /*this.eptService.getLists(this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.dataLists = data.data;
        this.totalItems = data.count;
        this.refreshData();
      });*/



    let message = {
      page: this.page,
      rows: this.pageSize,
      search: this.search,
      value: this.value
    };

    let roleId = localStorage.getItem('roleId');
    let wsUrl;
    if (roleId === '10') {
      wsUrl = `api/formal/ept/list/ws?token=${this.token}`;
    }
    if (roleId === '11') {
      wsUrl = `api/general/ept/list/ws?token=${this.token}`;
    }

    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          let equips = JSON.parse(data);
          // console.log(equips);
          this.dataLists = equips.ept_info;
          this.totalItems = equips.count;
          if (!this.dataLists) {
            this.dataLists = [];
          }
          this.refreshData();
        },
        err => console.log(err),
        () => console.log('ws结束')
      );

  }

  refreshData() {
    for (let i = 0; i < this.dataLists.length; i++) {
      let bo = this.dataLists[i];
      if (!bo.img) {
        bo.img = 'assets/images/no_image.png';
      }

      bo.isBurning = '未运行';
      bo.warning = '无告警';
      bo.malfunction = '无故障';
      /*if (bo.mtStatus === true) {
        bo.malfunction = '故障';
      }*/
      if (bo.online) {
        bo.online = '已联网';
        if (bo.run === true) {
          bo.isBurning = '运行';
        }
        if (bo.alarm_count > 0) {
          bo.warning = '告警';
        }
      } else {
        bo.online = '未联网';
        bo.isBurning = '未知';
        bo.warning = '未知';
        bo.malfunction = '未知';
      }
    }
    // console.log(this.dataLists);
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
    let message = {
      page: this.page,
      rows: this.pageSize,
      search: this.search,
      value: this.value
    };
    this.sendMessage(message);
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

  // 刷新
  refreshPage() {
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
    this.getList();
  }


  // 新增模态框
  addData() {
    let that = this;
    const modalRef = this.modalService.open(EqListAddComponent, {windowClass: 'modal_md', centered: true});
    // modalRef.componentInstance.currentData = this.config;
    // modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  // 新增关联模态框
  addData2() {
    let that = this;
    const modalRef = this.modalService.open(EqListLinkComponent, {windowClass: 'modal_md', centered: true});
    // modalRef.componentInstance.currentData = this.config;
    // modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }


  trackByUid(index, item) {
    return item.uid;
  }


  ngOnDestroy() {
    // console.log('page close');
    this.boilerWsService.sendText('close');
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
  }

}
