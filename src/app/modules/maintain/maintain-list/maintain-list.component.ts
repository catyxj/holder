import { Component, OnInit } from '@angular/core';
import {AddMaintainComponent} from '../add-maintain/add-maintain.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MaintainService} from '../../../shared/maintain.service';

@Component({
  selector: 'app-maintain-list',
  templateUrl: './maintain-list.component.html',
  styleUrls: ['./maintain-list.component.css']
})
export class MaintainListComponent implements OnInit {

  public maintains;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;

  constructor(private modalService: NgbModal,
              private maintainService: MaintainService) { }

  ngOnInit() {
  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {

    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  add() {
    // console.log(data);
    const modalRef = this.modalService.open(AddMaintainComponent, {size: 'lg'});
    // modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  view(data) {
    // console.log(data);
    const modalRef = this.modalService.open(AddMaintainComponent, {size: 'lg'});
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

}
