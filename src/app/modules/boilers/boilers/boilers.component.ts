import { Component, OnInit } from '@angular/core';
import {BoilerService} from '../../../shared/boiler.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddBoilerComponent} from '../add-boiler/add-boiler.component';
import {UserService} from '../../../shared/user.service';
import {JoinClusterComponent} from "../join-cluster/join-cluster.component";


@Component({
  selector: 'app-boilers',
  templateUrl: './boilers.component.html',
  styleUrls: ['./boilers.component.css'],
  providers: [
    AddBoilerComponent
  ]
})
export class BoilersComponent implements OnInit {

  boilers: any;
  boiler: any;
  page = 1;
  totalItems = 0;
  search: string;
  deleteList = [];
  allDelete = false;
  pageSize = 10;
  user: any;

  constructor(private boilerService: BoilerService,
              private modalService: NgbModal,
              private userService: UserService ) { }

  ngOnInit() {
    this.getBoilers();
    this.getUser();
  }

  // 获取锅炉列表
  getBoilers(): void {
    // console.log({page: this.page, pageSize: this.pageSize , search: this.search});
    this.boilerService.getBoilers(this.page, this.pageSize , this.search)
      .subscribe(boilers => {
        this.totalItems = boilers.counts;
        this.boilers = boilers.params;
        if (!this.boilers) {
          return;
        }
        for (let i = 0; i < this.boilers.length; i++) {
          let boiler = this.boilers[i];
          if (boiler.OrganizationsLinked) {
            for (let j = 0; j < boiler.OrganizationsLinked.length; j++) {
              if (boiler.OrganizationsLinked[j].Type.TypeId === 2) {
                boiler.enterprise = boiler.OrganizationsLinked[j].Name;
              }
            }
          }
          boiler.checkDelete = false;
        }
      });
  }

  // 获取用户信息
  getUser() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    /*this.userService.getUser()
      .subscribe( user => {
        this.user = user;
      });*/
  }


  // 批量选择
  checkDel(boiler): void {
    if ( boiler.checkDelete === true) {
      this.deleteList.push(boiler.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++){
        let dl = this.deleteList[i];
        if (dl === boiler.Uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.boilers.length; i++) {
        this.boilers[i].checkDelete = true;
        this.deleteList.push(this.boilers[i].Uid);
      }
    } else {
      for (let i = 0; i < this.boilers.length; i++) {
        this.boilers[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中锅炉 ？`);
    if (cf === true) {
      this.boilerService.deleteBoiler(this.deleteList)
        .subscribe(() => {
          this.pageChange();
        }, err => {
          alert(err);
        });
    } else {

    }

    // console.log(this.deleteList);
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getBoilers();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 添加设备模态框
  newBoiler() {
    const modalRef = this.modalService.open(AddBoilerComponent, { size: 'lg' });
    modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 批量添加集群模态框
  joinCluster() {
    const modalRef = this.modalService.open(JoinClusterComponent);
    modalRef.componentInstance.equipList = this.deleteList;
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
