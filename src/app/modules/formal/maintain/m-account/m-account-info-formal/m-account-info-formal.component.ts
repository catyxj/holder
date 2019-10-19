import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../../../shared/user.service";
import {MAccountBasicFComponent} from "../modals/m-account-basic-f/m-account-basic-f.component";
import {ActivatedRoute} from "@angular/router";
import {MaintainService} from "../../../../../shared/maintain.service";

import Swal from 'sweetalert2';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {MAccountDisabledFComponent} from "../modals/m-account-disabled-f/m-account-disabled-f.component";

@Component({
  selector: 'app-m-account-info-formal',
  templateUrl: './m-account-info-formal.component.html',
  styleUrls: ['./m-account-info-formal.component.css']
})
export class MAccountInfoFormalComponent implements OnInit {
  public uid;
  public listPage;
  public info;
  public operate;
  tplModal: NzModalRef;

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute,
              private nzModal: NzModalService,
              private maintainService: MaintainService) {}

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
    this.getInfo();
    this.getOperate();
  }

  // 获取维保账号信息
  getInfo() {
    /*this.info = {
      username: 'aaaaa',
      status: 1,
      role_id: 10,
      name: 'asdfa',
      org_name: '所属单位',
      org_tag: 1,
      location_id: 110101,
      location_name: '某省某市某区县 某某某街道',
      email: 'zhangsan@123.com',
      address: 'asdfahhhhhh'
    };*/

    this.maintainService.getUserInfo(this.uid)
      .subscribe(data => {
        this.info = data;
      }, err => {

      });
  }

  refresh() {
    this.getInfo();
    this.getOperate();
  }


  // 获取产品信息
  getOperate() {
   /* this.operate = [
      {
        uid: 'asdf',
        name: 'aaa',
        terminal_code: '610002',
        template_name: '某炉型锅炉模版',
        created_at: '2016-5-10',
        count: 12
      },
      {
        uid: 'asdf',
        name: 'aaa',
        terminal_code: '610002',
        template_name: '某炉型锅炉模版',
        created_at: '2016-5-10',
        count: 12
      }
    ];*/


    this.maintainService.getUserMtInfo(this.uid)
      .subscribe(data => {
        this.operate = data.data;
        if (!this.operate) {
          this.operate = [];
        }
      }, err => {

      });
  }

  // 编辑配置信息模态框
  editConfig() {
    let that = this;
    const modalRef = this.modalService.open(MAccountBasicFComponent, {windowClass: 'modal_m', centered: true});
    modalRef.componentInstance.currentData = this.info;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getInfo();
        that.getOperate();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  // 禁用
  dataDisabled() {
    let that = this;
    let post = [this.uid];
    const modalRef = this.modalService.open(MAccountDisabledFComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = post;
    modalRef.componentInstance.title = '账号禁用';
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getInfo();
        that.getOperate();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });

    /*let title = '确认要禁用此账号吗？';
    let subtitle = '';
    this.creatModal(title, subtitle, () => {

      this.maintainService.updateUserStatus(post)
        .subscribe(val => {
          Swal(
            '操作成功！',
            '',
            'success'
          );
          that.getInfo();
          that.getOperate();
        }, err => {
          Swal(
            '操作失败！',
            err.message || err,
            'error'
          );
        });
    });*/

  }


  creatModal(title, subtitle, call) {
    const that = this;
    this.tplModal = this.nzModal.confirm({
      nzTitle: title,
      nzContent: '',
      nzIconType: 'fill:question-circle',
      nzOnOk: () => {
        call();
        that.tplModal.destroy();
      }
    });
  }




}
