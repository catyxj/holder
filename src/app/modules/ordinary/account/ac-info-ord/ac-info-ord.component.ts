import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../../shared/account.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../../shared/user.service";
import {AcEditOrdComponent} from "../modals/ac-edit-ord/ac-edit-ord.component";
import {AcPasswordOrdComponent} from "../modals/ac-password-ord/ac-password-ord.component";

@Component({
  selector: 'app-ac-info-ord',
  templateUrl: './ac-info-ord.component.html',
  styleUrls: ['./ac-info-ord.component.css']
})
export class AcInfoOrdComponent implements OnInit {
  public user;
  public operate;
  public expand = [];

  constructor(private accountService: AccountService,
              private modalService: NgbModal,
              private userService: UserService) {
    this.userService.userStatus$ // 监测父组件user
      .subscribe( data => {
          this.user = data;
        }
      );
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(this.user);


    // this.expand = [{name: 'LOGO定制'}, {name: '视频监控'}];

    this.getOperate();
  }

  refresh() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getOperate();
  }

  // 获取记录信息
  getOperate() {
    this.operate = [
      {
        uid: 'asdf',
        created_at: '2016-5-10',
        info: '订单编号【201945678911664】'
      },
      {
        uid: 'asdfa',
        created_at: '2016-5-10',
        info: 'asdf'
      }
    ];

    // this.accountService.getOperate(this.uid)
    //   .subscribe(data => {
    //     this.operate = data;
    //   }, err => {
    //
    //   });
  }

  // 编辑配置信息模态框
  editConfig() {
    let that = this;
    const modalRef = this.modalService.open(AcEditOrdComponent, {windowClass: 'modal_m', centered: true});
    modalRef.componentInstance.currentData = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.userService.ChangeMission('changed');
        that.getOperate();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  changePass() {
    let that = this;
    const modalRef = this.modalService.open(AcPasswordOrdComponent, {windowClass: 'modal_md', centered: true});
    // modalRef.componentInstance.currentData = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {

      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

}
