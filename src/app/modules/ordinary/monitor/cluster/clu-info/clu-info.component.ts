import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';
import {CluBasicEditComponent} from "../modals/clu-basic-edit/clu-basic-edit.component";
import {ClusterService} from "../../../../../shared/cluster.service";

@Component({
  selector: 'app-clu-info',
  templateUrl: './clu-info.component.html',
  styleUrls: ['./clu-info.component.css']
})
export class CluInfoComponent implements OnInit {
  public uid;
  public dataLists = [];
  public data1 = [];
  public data2 = [];
  public data3 = [];
  public search = 'name';
  public page = 1;
  public pageNum;
  public pageSize = 50;
  public totalItems;
  public value = '';
  public status;
  public pageSizeList = [15, 30, 50, 100];


  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private clusterService: ClusterService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getList();
  }

  // 获取状态
  getStatus() {
    this.clusterService.getStatus(this.uid)
      .subscribe(data => {
        this.status = data;
      }, err => {

      });
  }

  getList() {
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];

    /*this.dataLists = [
      {
        uid: 'asdfa',
        online: false,
        run: false,
        alarm_count: 0,
        mal_func: 0,
        name: '阿凡达过过过达过过达过过',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 0
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 0
      },
      {
        uid: 'asdfa',
        online: false,
        run: false,
        alarm_count: 0,
        mal_func: 0,
        name: '阿凡达过过过达过过达过过',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 1
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 0
      },
      {
        uid: 'asdfa',
        online: true,
        run: true,
        alarm_count: 3,
        mal_func: 0,
        name: '哈哈啊哈啊啊',
        status: 1
      }
    ];

    for (let i = 0; i < this.dataLists.length; i++) {
      let item = this.dataLists[i];
      if (item.status === 0) {
        this.data3.push(item);
      } else if (!item.online) {
        this.data2.push(item);
      } else {
        this.data1.push(item);
      }

    }*/

    this.clusterService.getClusEquip(this.uid, this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.dataLists = data.data;
        this.totalItems = data.count;
        for (let i = 0; i < this.dataLists.length; i++) {
          let item = this.dataLists[i];
          if (item.status === 0) {
            this.data3.push(item);
          } else if (!item.online) {
            this.data2.push(item);
          } else {
            this.data1.push(item);
          }
        }
      }, err => {

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
    // console.log(this.search);
    // this.page = 1;
    this.getList();
  }
  searchEnter(event) {
    if (event.keyCode === 13) {
      this.searchChange();
    }
  }


  // 新增模态框
  addData() {
    let that = this;
    const modalRef = this.modalService.open(CluBasicEditComponent, {windowClass: 'modal_m', centered: true});
    // modalRef.componentInstance.currentData = this.config;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getList();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  goBack() {
    window.history.go(-1);
  }


}
