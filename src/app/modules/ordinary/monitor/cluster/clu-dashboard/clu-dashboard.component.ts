import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../../../shared/boiler.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {EqListAddComponent} from "../../list/modals/eq-list-add/eq-list-add.component";
import {BoilerSocketService} from "../../../../../shared/boiler-socket.service";

import Swal from 'sweetalert2';
import {ClusterService} from "../../../../../shared/cluster.service";

@Component({
  selector: 'app-clu-dashboard',
  templateUrl: './clu-dashboard.component.html',
  styleUrls: ['./clu-dashboard.component.css']
})
export class CluDashboardComponent implements OnInit, OnDestroy {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 4;
  public search = 'name';
  public value;
  public status = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private modalService: NgbModal,
              private clusterService: ClusterService,
              private boilerWsService: BoilerSocketService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // console.log('param', params.get('status'));
        this.page = parseInt(params.get('page'));
        if (!this.page) {
          this.page = 1;
        }
        this.getList();
        return (params.get('page') || []);
      })
    ).subscribe();
  }


  /*sendMessage(message) {
    this.boilerWsService.sendMessage(message);
  }*/

  // 获取列表
  getList() {
    this.clusterService.getLists(this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.dataLists = data.data;
        this.totalItems = data.count;
        this.refreshData();
      });


    /*let message = {
      page: this.page,
      rows: this.pageSize,
      search: this.search,
      value: this.value
    };
    const wsUrl = `api/formal/ept/list/ws?token=${this.token}`;
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
      );*/

  }

  refreshData() {
    for (let i = 0; i < this.dataLists.length; i++) {
      let bo = this.dataLists[i];
      if (!bo.img) {
        bo.img = 'assets/images/photo2.png';
      }
    }
    console.log(this.dataLists);
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
  pageChange() {
    /*let message = {
      page: this.page,
      rows: this.pageSize,
      search: this.search,
      value: this.value
    };
    this.sendMessage(message);*/
    this.getList();
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


  // 新增模态框
  /*addData() {
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
  }*/

  trackByUid(index, item) {
    return item.uid;
  }

  ngOnDestroy() {
    // console.log('page close');

    // this.socket.unsubscribe();
    // this.boilerWsService.closeSocket();
  }

}
