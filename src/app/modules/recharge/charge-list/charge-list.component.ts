import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RechargeService} from "../../../shared/recharge.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.css']
})
export class ChargeListComponent implements OnInit {
  public user;
  public orderList;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public isLoading = false;

  constructor(private modalService: NgbModal,
              private rechargeService: RechargeService) { }

  ngOnInit() {
    this.getLists();
  }

  // 获取集群列表
  getLists() {
    this.isSpinning = true;
    this.rechargeService.getLists(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.isSpinning = false;
        this.orderList = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
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
    this.getLists();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

}
