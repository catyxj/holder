import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/internal/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../../../shared/boiler.service";
import Swal from 'sweetalert2';
import {EqListAddComponent} from "../modals/eq-list-add/eq-list-add.component";

@Component({
  selector: 'app-eq-list-list',
  templateUrl: './eq-list-list.component.html',
  styleUrls: ['./eq-list-list.component.css']
})
export class EqListListComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value = '';
  public status = '';
  public run = '';
  public online = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute,
              private eptService: BoilerService) { }

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

  // 获取列表
  getList() {
    this.loading = true;
    this.eptService.getLists(this.page, this.pageSize, this.search, this.value, this.online, this.run, this.status)
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

  searchOnline(n?) {
    this.online = n;
    this.searchChange();
  }
  searchRun(n?) {
    this.run = n;
    this.searchChange();
  }
  searchStatus(n?) {
    this.status = n;
    this.searchChange();
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




}
